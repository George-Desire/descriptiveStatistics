class DescriptiveStatistics {
    constructor(data) {
        this.data = data;
        this.sortedData = data.slice().sort((a, b) => a - b);
    }

    //Measures of central tendency
    // Mean
    calculateMean() {
        const sum = this.data.reduce((acc, val) => acc + val, 0);
        return sum / this.data.length;
    }

    // Median
    calculateMedian() {
        const mid = Math.floor(this.sortedData.length / 2);
        if (this.sortedData.length % 2 === 0) {
            return (this.sortedData[mid - 1] + this.sortedData[mid]) / 2;
        } else {
            return this.sortedData[mid];
        }
    }

    // Mode
    calculateMode() {
        const frequencyMap = new Map();
        this.data.forEach(val => {
            frequencyMap.set(val, (frequencyMap.get(val) || 0) + 1);
        });
        let maxFrequency = 0;
        let modes = [];
        frequencyMap.forEach((frequency, value) => {
            if (frequency > maxFrequency) {
                modes = [value];
                maxFrequency = frequency;
            } else if (frequency === maxFrequency) {
                modes.push(value);
            }
        });
        return modes;
    }

    //Measures of dispersion
    // Range
    calculateRange() {
        return this.sortedData[this.sortedData.length - 1] - this.sortedData[0];
    }

    // Variance
    calculateVariance() {
        const mean = this.calculateMean();
        return this.data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / this.data.length;
    }

    // Standard deviation
    calculateStandardDeviation() {
        return Math.sqrt(this.calculateVariance());
    }

    // Quartiles
    calculateQuartiles() {
        const q1 = this.calculateQuantile(0.25);
        const q2 = this.calculateQuantile(0.5);
        const q3 = this.calculateQuantile(0.75);
        return { q1, q2, q3 };
    }

    // Interquartile range
    calculateInterquartileRange() {
        const { q1, q3 } = this.calculateQuartiles();
        return q3 - q1;
    }

    calculateQuantile(percentile) {
        const index = percentile * (this.sortedData.length - 1);
        const lowerIndex = Math.floor(index);
        const fraction = index - lowerIndex;
        if (lowerIndex === this.sortedData.length - 1) {
            return this.sortedData[lowerIndex];
        } else {
            return this.sortedData[lowerIndex] + fraction * (this.sortedData[lowerIndex + 1] - this.sortedData[lowerIndex]);
        }
    }
}

const data = [53, 22, 36, 41, 58, 53, 64, 63, 77, 81];
const stats = new DescriptiveStatistics(data);
console.log("Mean:", stats.calculateMean());
console.log("Median:", stats.calculateMedian());
console.log("Mode:", stats.calculateMode());
console.log("Range:", stats.calculateRange());
console.log("Variance:", stats.calculateVariance());
console.log("Standard Deviation:", stats.calculateStandardDeviation());
console.log("Quartiles:", stats.calculateQuartiles());
console.log("Interquartile Range:", stats.calculateInterquartileRange());