use std::str::FromStr;
use regex::Regex;

pub trait Parse {
    type Error;
    fn parse(s: &str) -> Result<Self, Self::Error> where Self: Sized;
}

impl<T> Parse for T where T: FromStr + Default, {
    type Error = String;
    fn parse(s: &str) -> Result<Self, Self::Error> {
        let re: Regex = Regex::new(r"^[0-9]+(\.[0-9]+)?").unwrap();
        // let d = || Default::default();
        if let Some(captures) = re.captures(s) {
            println!("result: {:?}",  captures.get(0));
            captures
                .get(0)
                .map_or(Err("failed to capture".to_string()), |c| c.as_str().parse().map_err(|_err| "failed to parse captured string".to_string()))
        } else {
            println!("result: {}", 1);
            Err("failed to parse string".to_string())
        }
    }
}

#[test]
fn test_parse() {
    assert_eq!(u32::parse("123abcd"), Ok(123)); 
    assert_eq!( u32::parse("123.45abcd"), Err("failed to parse captured string".into()) ); 
    assert_eq!(f64::parse("123.45abcd"), Ok(123.45)); 
    assert!(f64::parse("abcd").is_err());
}

fn main() {
    println!("result: {:?}", u32::parse("123.45abcd"));
}