function StringGenerator(logger){
	if(!logger){
		throw new Error('I need a logger!')
	}
	this.logger = logger;
	this.initialized = true;
	this.isValid = true;
	this.validate = function(options){
		try{
			options.validator();
		}catch(e){
			throw Error('Validator threw inner Exception');
		}
	}
}
module.exports = StringGenerator;