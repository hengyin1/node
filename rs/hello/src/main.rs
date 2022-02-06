// #[derive(Debug)]
// struct Matrix(f32, f32, f32, f32);
// use std::mem;

fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let even_numbers = numbers
        .into_iter()
        .filter(|n| n % 2 == 0)
        .collect::<Vec<_>>();

    println!("{:?}", even_numbers);

    // let xs: [i32; 5] = [1, 2, 3, 4, 5];
    // println!("array occupies {} bytes", mem::size_of_val(&xs));

    // let ys: [i32 ; 500] = [0 ; 500];
    // println!("ys len is {}", ys.len());
    // println!("ys is {:?}", ys);
    // println!("{:?}", &ys[1 .. 4]);
    // println!("{0}, this is {1}. {1}, this is {0}", "Alice", "Bob");

    // println!("{subject} {verb} {object}",
    // object="the lazy dog",
    // subject="the quick brown fox",
    // verb="jumps over");

    // println!("{} of {:b} people know binary, the other half doesn't", 1, 2);

    // println!("{number:>width$}", number=1, width=6);

    // println!("{number:0>width$}", number=1, width=6);

    // let pair = (1, false);
    // println!("the pair first value is {}", pair.0);
    // println!("pair is {:?}", pair);
    // println!("the reversed pair is {:?}", reverse(pair));

    // // let too_long_tuple = (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
    // // println!("too long tuple: {:?}", too_long_tuple);

    // println!("one element tuple: {:?}", (5u32,));
    // println!("just an integer: {:?}", (5u32));

    // let tuple = (1, "hello", 4.5, true);

    // let (a, b, c, d) = tuple;
    // println!("{:?}, {:?}, {:?}, {:?}", a, b, c, d);

    // let matrix = Matrix(1.1, 1.2, 2.1, 2.2);
    // println!("{:?}", matrix);
}

// fn reverse(pair: (i32, bool)) -> (bool, i32) {
//     let (a, b) = pair;
//     (b, a)
// }
