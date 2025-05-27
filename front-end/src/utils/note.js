const getAvisAverage = (avis) => {
		let average = 0;
		if (!avis) {
			return;
		}
		if (avis.length === 0) {
			return 0;
		}
		for (let a of avis) {
			average += a.note;
		}
		average = average / avis.length;
		if (average % 1 !== 0) {
			average = average.toFixed(3);
		}
		return average;
	};
const getAvisNumber = (avis) => {
    return avis ? avis.length : 0;
};

export {
    getAvisAverage,
    getAvisNumber
}