import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/collections.js';

Template.Book.helpers({
	proAll(){
	return userDB.find({});
},
});

Template.profiles.events({
  'click .js-like'(event, instance) {	
		var profID = this._id;
		var numLikes = userDB.findOne({_id:  profID}).like;
		if (!numLikes) {
			numLikes = 0;
		}
		numLikes = numLikes + 1;	
		userDB.update({_id:profID}, {$set:{'like': numLikes}});
  },
  'click .js-dislike'(event, instance){
		var profID = this._id;
		var numDisLikes = userDB.findOne({_id:  profID}).dislike;
		if (!numDisLikes) {
			numDisLikes = 0;
		}
		numDisLikes = numDisLikes + 1;	
		userDB.update({_id:profID}, {$set:{'dislike': numDisLikes}});
  },
  'click .js-delete'(event, instance){
  	// console.log(this._id);
  	var profID = this._id;
  	$("#" + profID).fadeOut("slow", "swing", function () {
  		userDB.remove({_id: profID});
  	});
  },
  'click .viewUser'(event, instance){
  	var uId = this._id;
  	$('#userId').val(uId);
  	$('#viewUserBook img').attr('src',userDB.findOne({_id:uId}).img);
  }
});
//  'click .js-Bookedit'(event, instance){
//   	var uId =this._id;
//   	$('#userId').val(uId);
//   	$('#viewUser img').attr('src',userDB.findOne({_id:uId}).img);
//   	$("#edited").modal('show');
//   	console.log("open modal");
//   }
// }); 	

Template.addBook.events({
'click .js-saveBook'(event, instance){  	
// get user data
var title = $("#picture input[name='title']").val();
 	
var author = $("#picture input[name='author']").val();

var description = $("#picture input[name='description']").val();
 	
var image = $("#picture input[name='image']").val();
if (image == ""){
	image="pokemon.png";
}	
console.log("The title name is" ,title);
console.log("The author name is",author);
console.log("The image is",image);
//reset the fore
$("#picture input[name='title']").val('');
$("#picture input[name='author']").val('');
$("#picture input[name='description']").val('');
$("#picture input[name='image']").val('');
//close the modal 
  $("#picture").modal("hide");
  userDB.insert({'title':title, 'author':author,'description':description, 'img':image});
  },
});
