/* Copyright (C) Matthieu Tourne */

// create a new k element space saver
function new_space_saver(nbItems) {
    var scores = {
        // we'll be storing token, score (counter) and card (cardinality)
        // for each element
        // - scores.token[<token>] can access the struct by token
        // - scores.card[<card>] can access the struct by card
        token : {},
        card : [],

        size : nbItems,

        overrestimates: {}
    };

    // initiate all counters to 0
    for (var i = 0; i < nbItems; i++) {
        scores.card[i] = {
            score: 0,
            token: null,
            card: i
        };
    }

    return scores;
}

// swap two scores based on cardinality in the set
function swap_scores_space_saver(scores, card1, card2) {
    var t1 = scores.card[card1];
    var t2 = scores.card[card2];

    // swap the cardinalities
    t1.card = card2;
    t2.card = card1;
    scores.card[card1] = t2;
    scores.card[card2] = t1;
}


// add +1 to a token in the space saver
//  Note: adding +n is a separate case
//  (would require insertion in sorted list)
//  Here, at most we'll do 1 swap
function inc_space_saver(scores, t) {
    var new_score = t.score + 1;
    t.score = new_score;

    var swap_from = t.card;
    var swap_to = t.card + 1;

    var next_t = scores.card[swap_to];
    var next_next_t;

    if (next_t && new_score > next_t.score) {
        next_next_t = scores.card[swap_to + 1];

        // skip equal elements to minimize number of swaps
        while (next_next_t && next_t.score == next_next_t.score) {
            swap_to = swap_to + 1;
            next_next_t = scores.card[swap_to + 1];
        }

        swap_scores_space_saver(scores, swap_from, swap_to);
        return swap_to;
    }

    // no swap
    return swap_from;
}

function insert_space_saver(scores, token) {
    var t = scores.token[token];

    if (t) {
        // token is already present, inc by 1
        // console.log(t);
        inc_space_saver(scores, t);
    } else {
        // get t1, the cardinality-1 score (lowest score)
        var t1 = scores.card[0];
        if (t1.token) {
            // remove reference to old token
            scores.token[t1.token] = null;
            scores.overrestimates[t1.token] = null;
        }
        // set new token
        t1.token = token;
        scores.token[token] = t1;
        // overrestimate is old score
        scores.overrestimates[token] = t1.score;
        // inc t1's score by 1
        inc_space_saver(scores, t1);
    }
}

// TODO: only return the tokens above a certain
// confidence factor (low overrestimates)
function get_top_space_saver(scores, max) {
    var card = scores.card
    var output = []

    for (var i = card.length - 1; i >= 0 && max > 0; i--, max--) {
        output.push(card[i].token);
    }

    return output;
}
