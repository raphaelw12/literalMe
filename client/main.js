import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/collections.js';

Template.Book.helpers({
	proAll(){
	return userDB.find({});
},
});

Template.Book.events({
  'click .js-like'(event, instance) {
    console.log("you click like");
    var proFID = this._id;
    var numLikes =userDB.findOne({_id: proFID}).like;
    if (!numLikes) {
      numLikes= 0;
    }
    numLikes = numLikes + 1;
    console.log("you have",numLikes);
    userDB.update({_id:proFID}, {$set:{'like':numLikes}});
  },
  'click .js-dislike'(event, instance){
    console.log("you clicked dislike");
    var proFID = this._id;
    var numDLikes =userDB.findOne({_id: proFID}).dislike;
    if (!numDLikes) {
      numDLikes= 0;
    }
    numDLikes = numDLikes + 1;
    console.log("you have",numDLikes);
    userDB.update({_id:proFID}, {$set:{'dislike':numDLikes}});
  },

  'click .js-delete'(event, instance){
    // console.log(this._id);
    var proFID = this._id;
    $("#" + proFID).fadeOut("slow","swing",function() {
      userDB.remove({_id: proFID});
    });   
  },
//   'click .viewBook'(event, instance){
//   	var uId = this._id;
//   	$('#userId').val(uId);
//   	$('#viewUserBook img').attr('src',userDB.findOne({_id:uId}).img);
//   }
// });
 'click .js-Bookedit'(event, instance){
  	var uId =this._id;
  	$('#userId').val(uId);
  	$('#viewUser img').attr('src',userDB.findOne({_id:uId}).img);
  	$("#edited").modal('show');
  	console.log("open modal");
  }
}); 	

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
