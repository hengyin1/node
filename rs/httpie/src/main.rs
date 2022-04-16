use clap::Parser;
use anyhow::{anyhow, Result};
use reqwest::{header, Client, Response, Url};
use std::{collections::HashMap, str::FromStr};
use mime::Mime;
use colored::*;

#[derive(Parser, Debug)]
#[clap(version = "3.1.9", author = "herman")]
struct Opts {
    #[clap(subcommand)]
    subcmd: SubCommand,
}

#[derive(Parser, Debug)]
enum SubCommand {
    Get(Get),
    Post(Post),
    // 我们暂且不支持其它 HTTP 方法
}

#[derive(Parser, Debug)]
struct Get {
    #[clap(parse(try_from_str = parse_url))]
    url: String,
}

#[derive(Parser, Debug)]
struct Post {
    #[clap(parse(try_from_str = parse_url))]
    url: String,
    #[clap(parse(try_from_str = parse_kv_pair))]
    body: Vec<KvPair>,
}

#[derive(Debug)]
struct KvPair {
    k: String,
    v: String,
}

impl FromStr for KvPair {
    type Err = anyhow::Error;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut split = s.split("=");
        Ok(Self {
            k: split.next().unwrap().to_string(),
            v: split.next().unwrap().to_string(),
        })
    }
}

fn parse_url(s: &str) -> Result<String> {
    let _url: Url = s.parse()?;
    Ok(s.into())
}

fn parse_kv_pair(s: &str) -> Result<KvPair> {
   Ok(s.parse()?)
}

async fn get(client: Client, args: &Get) -> Result<()> {
    let res = client.get(&args.url).send().await?;
    // println!("{:?}", res.text().await?);
    Ok(print_resp(res).await?)
}

async fn post(client: Client, args: &Post) -> Result<()> {
    let mut body = HashMap::new();
    for kv in args.body.iter() {
        body.insert(&kv.k, &kv.v);
    }
    let res = client.post(&args.url).json(&body).send().await?;
    // println!("{:?}", res.text().await?);
    Ok(print_resp(res).await?)
}

async fn print_resp(resp: Response) -> Result<()> {
    print_status(&resp); 
    print_headers(&resp);
    let mime = get_content_type(&resp);
    let body = resp.text().await?; 
    print_body(mime, &body);
    Ok(())
}

fn print_status(resp: &Response) {
    let status = format!("{:?} {}", resp.version(), resp.status()).blue();
    println!("{}\n", status);
}

fn print_headers(resp: &Response) {
    let headers = resp.headers();
    for (k, v) in headers.iter() {
        println!("{}: {:?}", k.to_string().green(), v);
    }
    print!("\n");
}

fn get_content_type(resp: &Response) -> Option<Mime> {
    resp.headers()
        .get(header::CONTENT_TYPE)
        .map(|v| v.to_str().unwrap().parse().unwrap())
}

fn print_body(mime: Option<Mime>, body: &str) {
    match mime {
        Some(v) if v == mime::APPLICATION_JSON => {
            print!("{}", jsonxf::pretty_print(body).unwrap().cyan());
        }
        _ => println!("{}", body),
    }
}

#[tokio::main]
async fn main() -> Result<()> {
    let opts: Opts = Opts::parse();
    // println!("opts{:?}", opts);
    let client = Client::new();
    let result = match opts.subcmd {
        SubCommand::Get(ref args) => get(client, args).await?,
        SubCommand::Post(ref args) => post(client, args).await?,
    };

    Ok(result)
}
