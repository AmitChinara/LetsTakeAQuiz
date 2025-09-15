const getPointDistribution = () => {
    const totalLevels = parseInt(process.env.TOTAL_LEVELS) || 15;
    const totalPoints = parseInt(process.env.TOTAL_POINTS) || 100;
    if (totalLevels <= 0 || !Number.isInteger(totalLevels)) {
        console.error("Please enter a positive integer for the number of level.");
        return [];
    }

    const ratio = 2.1; // ensures > 2x growth
    const denominator = (Math.pow(ratio, totalLevels) - 1) / (ratio - 1);

    const firstShare = totalPoints / denominator;

    const distribution = [];
    for (let i = 0; i < totalLevels; i++) {
        const amount = firstShare * Math.pow(ratio, i);
        distribution.push(parseFloat(amount.toFixed(6))); // keep precision
    }

    return distribution;
}

module.exports = {
    getPointDistribution,
}