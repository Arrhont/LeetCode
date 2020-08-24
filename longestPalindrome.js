function longestPalindrome(string) {
  let result = '';
  const lettersHashMap = new Map();

  for (let i = 0; i < string.length; i++) {
    if (!lettersHashMap.has(string[i])) {
      lettersHashMap.set(string[i], [i])
    } else {
      lettersHashMap.get(string[i]).push(i);
    }
  }

  for (letterIndexArr of lettersHashMap.values()) {
    if (letterIndexArr.length > 1) {
      const possiblePalindromeCoords = getAllPossiblePalindromeCoords(letterIndexArr);

      for ([start, end] of possiblePalindromeCoords) {
        const palindromeCandidate = string.substring(start, end + 1);
        if (checkPalindrome(palindromeCandidate)) {
          result = (result.length < palindromeCandidate.length) ? palindromeCandidate : result;
        }
      }
    }
  }

  return result;
}

function checkPalindrome(string) {
  for (let i = 0; i < Math.floor(string.length / 2); i++) {
    if (string[i] !== string[string.length - 1 - i]) {
      return false;
    }

    return true;
  }
}

function getAllPossiblePalindromeCoords(array) {
  const result = [];

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if ((j - i) === 1) {
        result.push([array[i], array[j]]);
      } else {
        let isPotentialPalindrome = true;

        for ( let k = 1; k <= Math.floor((j - i) / 2); k++) {
          if (array[i + k] - array[i] !== array[j] - array[j - k]) {
            isPotentialPalindrome = false;
          }
        }

        if (isPotentialPalindrome) {
          result.push([array[i], array[j]]);
        }
      }
    }
  }

  return result;
}

console.log(longestPalindrome('aabbba'))