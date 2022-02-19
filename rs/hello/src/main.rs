use std::rc::Rc;
// #[derive(Debug)]
// enum Gender {
//   Unspecified = 0,
//   Female = 1,
//   Male = 2,
// }

// #[derive(Debug, Copy, Clone)]
// struct UserId(u64);

// #[derive(Debug, Copy, Clone)]
// struct TopicId(u64);

// #[derive(Debug)]
// struct User {
//   id: UserId,
//   name: String,
//   gender: Gender,
// }

// #[derive(Debug)]
// struct Topic {
//   id: TopicId,
//   name: String,
//   owner: UserId,
// }

// #[derive(Debug)]
// enum Event {
//   Join((UserId, TopicId)),
//   Leave((UserId, TopicId)),
//   Message((UserId, TopicId, String)),
// }

// fn fib_loop(n: u8) {
//   let mut a = 1;
//   let mut b = 1;
//   let mut i = 2u8;

//   loop {
//     let c = a + b;
//     a = b;
//     b = c;
//     i += 1;

//     println!("next val is {}", b);
//     if i >= n {
//       break;
//     }
//   }
// }

// fn fib_while(n: u8) {
//   let (mut a, mut b, mut i) = (1, 1, 2);

//   while i < n {
//     let c = a + b;
//     a = b;
//     b = c;
//     i += 1;

//     println!("next val is {}", b);
//   }
// }

// fn fib_for(n: u8) {
//   let (mut a, mut b) = (1, 1);

//   for _i in 2..n {
//     let c = a + b;
//     a = b;
//     b = c;

//     println!("next val is {}", b);
//   }
// }

// fn process_message(event: &Event) {
//   if let Event::Message((_, _, msg)) = event {
//     println!("broadcast: {}", msg);
//   }
// }

fn main() {
  // fib_loop(10);
  // fib_while(10);
  // fib_for(10);
  
  // let alice = User { id: UserId(1), name: "Alice".into(), gender: Gender::Female };
  // let bob = User { id: UserId(2), name: "Bob".into(), gender: Gender::Male };
  
  // let topic = Topic { id: TopicId(1), name: "rust".into(), owner: UserId(1) };
  // let event1 = Event::Join((alice.id, topic.id));
  // let event2 = Event::Join((bob.id, topic.id));
  // let event3 = Event::Message((alice.id, topic.id, "Hello world!".into()));
  
  // println!("event1: {:?}, event2: {:?}, event3: {:?}", event1, event2, event3);

  // let data = vec![1, 2, 3, 4];
  // let data1 = &data;
  // println!( "addr of value: {:p}({:p}), addr of data {:p}, data1: {:p}", &data, data1, &&data, &data1 );

  // println!("sum of data1: {}", sum(&data1)); 
  // println!("data1: {:?}", data1); // error1 
  // println!("sum of data: {}", sum(&data)); // error2

  let a = Rc::new(1);
  let b = a.clone();
  let c = a.clone();
}

// fn sum(data: &Vec<u32>) -> u32 {
//     println!("addr of value: {:p}, addr of ref: {:p}", data, &data);
//     data.iter().fold(0, |acc, x| acc + x)
// }