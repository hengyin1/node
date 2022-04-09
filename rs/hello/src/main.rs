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



// use std::net::{IpAddr, Ipv4Addr, Ipv6Addr};

// fn print(v: impl Into<IpAddr>) {
//     println!("{:?}", v.into());
// }

// fn main() {
//     let v4: Ipv4Addr = "2.2.2.2".parse().unwrap();
//     let v6: Ipv6Addr = "::1".parse().unwrap();
    
//     // IPAddr 实现了 From<[u8; 4]，转换 IPv4 地址
//     print([1, 1, 1, 1]);
//     // IPAddr 实现了 From<[u16; 8]，转换 IPv6 地址
//     print([0xfe80, 0, 0, 0, 0xaede, 0x48ff, 0xfe00, 0x1122]);
//     // IPAddr 实现了 From<Ipv4Addr>
//     print(v4);
//     // IPAddr 实现了 From<Ipv6Addr>
//     print(v6);
// }



// #[allow(dead_code)]
// enum Language {
//     Rust,
//     TypeScript,
//     Elixir,
//     Haskell,
// }

// impl AsRef<str> for Language {
//     fn as_ref(&self) -> &str {
//         match self {
//             Language::Rust => "Rust",
//             Language::TypeScript => "TypeScript",
//             Language::Elixir => "Elixir",
//             Language::Haskell => "Haskell",
//         }
//     }
// }

// fn print_ref(v: impl AsRef<str>) {
//     println!("{}", v.as_ref());
// }

// fn main() {
//     let lang = Language::Rust;
//     // &str 实现了 AsRef<str>
//     print_ref("Hello world!");
//     // String 实现了 AsRef<str>
//     print_ref("Hello world!".to_string());
//     // 我们自己定义的 enum 也实现了 AsRef<str>
//     print_ref(lang);
// }



// use std::ops::{Deref, DerefMut};

// #[derive(Debug)]
// struct Buffer<T>(Vec<T>);

// impl<T> Buffer<T> {
//     pub fn new(v: impl Into<Vec<T>>) -> Self {
//         Self(v.into())
//     }
// }

// impl<T> Deref for Buffer<T> {
//     type Target = [T];

//     fn deref(&self) -> &Self::Target {
//         &self.0
//     }
// }

// impl<T> DerefMut for Buffer<T> {
//     fn deref_mut(&mut self) -> &mut Self::Target {
//         &mut self.0
//     }
// }

// fn main() {
//     let mut buf = Buffer::new([1, 3, 2, 4]);
//     // 因为实现了 Deref 和 DerefMut，这里 buf 可以直接访问 Vec<T> 的方法
//     // 下面这句相当于：(&mut buf).deref_mut().sort()，也就是 (&mut buf.0).sort()
//     buf.sort();
//     println!("buf: {:?}", buf);
// }



// use std::fmt;
// // struct 可以 derive Default，但我们需要所有字段都实现了 Default
// #[derive(Clone, Debug, Default)]
// struct Developer {
//     name: String,
//     age: u8,
//     lang: Language,
// }

// // enum 不能 derive Default
// #[allow(dead_code)]
// #[derive(Clone, Debug)]
// enum Language {
//     Rust,
//     TypeScript,
//     Elixir,
//     Haskell,
// }

// // 手工实现 Default
// impl Default for Language {
//     fn default() -> Self {
//         Language::Rust
//     }
// }

// impl Developer {
//     pub fn new(name: &str) -> Self {
//         // 用 ..Default::default() 为剩余字段使用缺省值
//         Self {
//             name: name.to_owned(),
//             ..Default::default()
//         }
//     }
// }

// impl fmt::Display for Developer {
//     fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
//         write!(
//             f,
//             "{}({} years old): {:?} developer",
//             self.name, self.age, self.lang
//         )
//     }
// }

// fn main() {
//     // 使用 T::default()
//     let dev1 = Developer::default();
//     // 使用 Default::default()，但此时类型无法通过上下文推断，需要提供类型
//     let dev2: Developer = Default::default();
//     // 使用 T::new
//     let dev3 = Developer::new("Tyr");
//     println!("dev1: {}\\ndev2: {}\\ndev3: {:?}", dev1, dev2, dev3);
// }




// use std::{
//   collections::LinkedList,
//   ops::{Deref, DerefMut, Index},
// };
// struct List<T>(LinkedList<T>);

// impl<T> Deref for List<T> {
//   type Target = LinkedList<T>;

//   fn deref(&self) -> &Self::Target {
//       &self.0
//   }
// }

// impl<T> DerefMut for List<T> {
//   fn deref_mut(&mut self) -> &mut Self::Target {
//       &mut self.0
//   }
// }

// impl<T> Default for List<T> {
//   fn default() -> Self {
//       Self(Default::default())
//   }
// }

// impl<T> Index<isize> for List<T> {
//   type Output = T;

//   fn index(&self, index: isize) -> &Self::Output {
//       let len = self.len() as isize;
//       let n = (len + index % len) % len;
//       let iter = self.iter();
//       iter.skip(n as usize).next().unwrap()
//   }
// }

// #[test]
// fn it_works() {
//   let mut list: List<u32> = List::default();
//   for i in 0..16 {
//       list.push_back(i);
//   }

//   assert_eq!(list[0], 0);
//   assert_eq!(list[5], 5);
//   assert_eq!(list[15], 15);
//   assert_eq!(list[16], 0);
//   assert_eq!(list[-1], 15);
//   assert_eq!(list[128], 0);
//   assert_eq!(list[-128], 0);
// }





use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    explain("empty", &map);

    map.insert('a', 1);
    explain("added 1", &map);

    map.insert('b', 2);
    map.insert('c', 3);
    explain("added 3", &map);

    map.insert('d', 4);
    explain("added 4", &map);

    // get 时需要使用引用，并且也返回引用
    assert_eq!(map.get(&'a'), Some(&1));
    assert_eq!(map.get_key_value(&'b'), Some((&'b', &2)));

    map.remove(&'a');
    // 删除后就找不到了
    assert_eq!(map.contains_key(&'a'), false);
    assert_eq!(map.get(&'a'), None);
    explain("removed", &map);
    // shrink 后哈希表变小
    map.shrink_to_fit();
    explain("shrinked", &map);
}

fn explain<K, V>(name: &str, map: &HashMap<K, V>) {
    println!("{}: len: {}, cap: {}", name, map.len(), map.capacity());
}