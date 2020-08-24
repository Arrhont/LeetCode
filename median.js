function supaDupaFastMedianFind(arrayA, arrayB) {
    const mergedArrayLength = arrayA.length + arrayB.length;
    const halfLength = Math.ceil(mergedArrayLength / 2);
    const isMeredLengthOdd = (mergedArrayLength & 1) === 1;

    if (arrayA.length > arrayB.length) {
        [arrayA, arrayB] = [arrayB, arrayA];
    }

    let aMinElementsInHalf = 0;
    let aMaxElementsinHalf = arrayA.length;

    while (aMinElementsInHalf <= aMaxElementsinHalf) {
        let aElementsInHalf =
            aMinElementsInHalf +
            Math.floor((aMaxElementsinHalf - aMinElementsInHalf) / 2);

        let bElementsInHalf = halfLength - aElementsInHalf;

        const aEdge = getElementFromArray(aElementsInHalf, arrayA);
        const bEdge = getElementFromArray(bElementsInHalf, arrayB);
        const aNextToEdge = getElementFromArray(aElementsInHalf + 1, arrayA);
        const bNextToEdge = getElementFromArray(bElementsInHalf + 1, arrayB);

        if (aElementsInHalf > 0 && aEdge > bNextToEdge) {
            aMaxElementsinHalf = aElementsInHalf - 1;
        } else if (aElementsInHalf < arrayA.length && bEdge > aNextToEdge) {
            aMinElementsInHalf = aElementsInHalf + 1;
        } else {
            const leftHalfEnd =
                aElementsInHalf === 0
                    ? bEdge
                    : bElementsInHalf === 0
                    ? aEdge
                    : Math.max(aEdge, bEdge);

            if (isMeredLengthOdd) {
                return leftHalfEnd;
            } else {
                const rightHalfStart =
                    aElementsInHalf === arrayA.length
                        ? bNextToEdge
                        : bElementsInHalf === arrayB.length
                        ? aNextToEdge
                        : Math.max(aNextToEdge, bNextToEdge);

                return (leftHalfEnd + rightHalfStart) / 2;
            }
        }
    }
}

function getElementFromArray(elementInArray, array) {
    if (elementInArray < 1) {
        return 'leftEndOfArray';
    }

    if (elementInArray > array.length) {
        return 'rightEndOfArray';
    }

    return array[elementInArray - 1];
}

const a = [1, 2];
const b = [3, 4];

console.log(supaDupaFastMedianFind(a, b));
const c = a.concat(b);
c.sort((a, b) => a - b);
console.log(c);
