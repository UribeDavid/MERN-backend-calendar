const isDate = value => (!!value || value === 0) && !isNaN( new Date( value ) );

module.exports = { isDate }