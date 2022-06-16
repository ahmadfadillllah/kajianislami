const helpers = {
    generateHslaColors: function(total = 0) {
        let colors = [];
        let randomVal = helpers.randomVal;
        for (let i = 0; i < total; i++) {
            let hsl = 'hsl(' + randomVal(0, 360) + ', ' + randomVal(30, 95) + '%,  ' + randomVal(30, 80) + '%)';
            colors.push(hsl);
        }
        return colors;
    },
    randomVal: function(min, max) {
        return Math.floor(Math.random() * (max - min) + 1) + min;
    }
};

module.exports = helpers;
