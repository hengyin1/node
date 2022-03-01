// use std::str::FromStr;
// use regex::Regex;

// pub trait Parse {
//     type Error;
//     fn parse(s: &str) -> Result<Self, Self::Error> where Self: Sized;
// }

// impl<T> Parse for T where T: FromStr + Default, {
//     type Error = String;
//     fn parse(s: &str) -> Result<Self, Self::Error> {
//         let re: Regex = Regex::new(r"^[0-9]+(\.[0-9]+)?").unwrap();
//         // let d = || Default::default();
//         if let Some(captures) = re.captures(s) {
//             println!("result: {:?}",  captures.get(0));
//             captures
//                 .get(0)
//                 .map_or(Err("failed to capture".to_string()), |c| c.as_str().parse().map_err(|_err| "failed to parse captured string".to_string()))
//         } else {
//             println!("result: {}", 1);
//             Err("failed to parse string".to_string())
//         }
//     }
// }

// #[test]
// fn test_parse() {
//     assert_eq!(u32::parse("123abcd"), Ok(123)); 
//     assert_eq!( u32::parse("123.45abcd"), Err("failed to parse captured string".into()) ); 
//     assert_eq!(f64::parse("123.45abcd"), Ok(123.45)); 
//     assert!(f64::parse("abcd").is_err());
// }

// fn main() {
//     println!("result: {:?}", u32::parse("123.45abcd"));
// }


#[derive(Clone, Debug)]
struct Developer {
  name: String,
  age: u8,
  lang: Language
}

#[allow(dead_code)]
#[derive(Clone, Debug)]
enum Language {
  Rust,
  TypeScript,
  Elixir,
  Haskell
}

fn main() {
    let dev = Developer {
        name: "Tyr".to_string(),
        age: 18,
        lang: Language::Rust
    };
    let dev1 = dev.clone();
    println!("dev: {:?}, addr of dev name: {:p}", dev, dev.name.as_str());
    println!("dev1: {:?}, addr of dev1 name: {:p}", dev1, dev1.name.as_str())
}