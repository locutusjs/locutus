function similar_text (first, second) {
    /*
     * This is a direct port from PHP source code with a few modifications. May be buggy.
     * This function still needs to be checked and unit tested.
     * Other goals are to switch from recursive to iterative approach
     *
     * Original by: Rafał Kukawski
     */
    var pos1 = 0, pos2 = 0, max = 0,
        firstLength = first.length, secondLength = second.length,
        p, q, l, sum;
    
    max = 0;
    
    for (p = 0; p < firstLength; p++) {
        for(q = 0; q < secondLength; q++) {
            for (l = 0; (p + l < firstLength) && (q + l < secondLength) && (first.charAt(p + l) === second.charAt(q + l)); l++);
            if (l > max) {
                max = l;
                pos1 = p;
                pos2 = q;
            }
        }
    }
    
    sum = max;
    
    if (sum) {
        if (pos1 && pos2) {
            sum += similar_text(first.substr(0, pos2), second.substr(0, pos2));
        }
        
        if ((pos1 + max < firstLength) && (pos2 + max < secondLength)) {
            sum += similar_text(first.substr(pos1 + max, firstLength - pos1 - max), second.substr(pos2 + max, secondLength - pos2 - max));
        }
    }
    
    return sum;
}

