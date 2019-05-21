// Schema for a charger class

class charger{
	constructor(obj){
		this.obj = obj;
		this.cuid = obj.cuid; //PK
		this.location = obj.location; //address
		this.lat = obj.lat; //latitude
		this.lon = obj.lon; //lontitude
		this.ratingAvg = obj.ratingAvg;
		this.type = obj.type;
		this.detail = obj.detail;
		this.uuid = obj.uuid //FK 
		this.reviews = obj.reviews //FK array
		this.bookings = obj.bookings //FK array
		this.history = obj.history //FK array
	}
}