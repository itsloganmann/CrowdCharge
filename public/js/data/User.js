// Schema for a user class

class user{
	constructor(obj){
		this.obj = obj;
		this.uuid = obj.uuid; //PK
		this.name = obj.name; 
		this.phone = obj.phone;
		this.email = obj.email;
		this.chragers = obj.chragers; //FK array
		this.reviews = obj.reviews; //FK array
		this.bookings = obj.bookings; //FK array
	}
}