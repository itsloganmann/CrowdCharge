// Schema for a review class

class review{
	constructor(obj){
		this.obj = obj;
		this.ruid = obj.ruid; //PK
		this.uuid = obj.uuid; //FK array
		this.cuid = obj.cuid; //FK array
		this.comment = obj.comment; //String
		this.rating = obj.rating; //Number

	}
}