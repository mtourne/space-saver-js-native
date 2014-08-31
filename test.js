function topk_words(content, nbItems) {
    var space_saver = new_space_saver(nbItems * 2);

    var words = content.toLowerCase().replace(/\W/g, ' ').split(/\s+/);

    for (var i = 0; i < words.length; i++) {
        insert_space_saver(space_saver, words[i]);
    }

    return get_top_space_saver(space_saver, nbItems);
}


//// TESTING ////

/* this test picks random numbers repeatedly
 * and attempts to divide them by primes in inverse order
 * if the number is divisable, it's replaced by the prime that divises it
 *
 * the number is random, but the density of primes is known and should be
 * found back
 */

var PRIMES = [
    7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59,
    61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131,
    137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197,
    199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271,
    277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353,
    359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433,
    439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509,
    521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601,
    607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677,
    683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769,
    773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859,
    863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953,
    967, 971, 977, 983, 991, 997 ]

function get_prime(num) {
    var i = PRIMES.length;

    var prime;

    while (i >= 0) {
        prime = PRIMES[i]
        if (num % prime == 0) {
            return prime
        }
        i = i - 1
    }

   return num
}


// testing
var space_saver = new_space_saver(PRIMES.length * 2);

var ITERATION = 1000000;

for (var i = 0; i < ITERATION; i++) {
    var num = Math.floor((Math.random() * 100000000) + 1);
    num = get_prime(num);

    insert_space_saver(space_saver, num.toString());
}

var topk = get_top_space_saver(space_saver, PRIMES.length);
var i;
for (i = 0; i < PRIMES.length; i++) {
    if (topk[i] != PRIMES[i].toString()) {
        break;
    }
}
document.write("<br>");
document.write("Primes are good until: " + i + "; Max :" + (PRIMES.length - 1));


document.write("<br>");
document.write("<br>");
document.write("Simple test:");
document.write("<br>");
var text = "blah titi blah toto blah titi titi toto foo arf blah";
topk = topk_words(text, 3);

document.write("<br>");
document.write(text);
document.write("<br>");
document.write(topk);
