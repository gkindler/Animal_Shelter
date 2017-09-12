$(function() {

  const list = $(".animal_list");
  const animalsUrl = "http://localhost:3000/animals/";

  // creating list elements with animals from the list

  insertAnimals = (animals) => {
    for( let i = 0; i < animals.length; i++ ) {
      let li = $('<li>').data('id', animals[i].id);
      let h3 = $('<h3>').text(animals[i].animal);
      let h4 = $('<h4>').text(animals[i].animalName);
      let delBtn = $("<button class='delete'>Delete</button>");
      let editBtn = $("<button class='edit'>Edit</button>");
      delBtn.attr("data-id", animals[i].id);
      editBtn.attr("data-id", animals[i].id);
      li.append(h3).append(h4).append(delBtn).append(editBtn);
      list.append(li);
    };
  }

  // Getting animals from the text file

  loadAnimals = () => {
    $.ajax({
      type: "GET",
      url: animalsUrl,
      dataType: "json"
    }).done(function(data){
      insertAnimals(data);
    }).fail(function(error){
      console.log(error);
    })
  };

  loadAnimals();

  // adding new animals

  const addBtn = $(".addAnimal");

  addAnimal = () => {
    addBtn.on("click", function(event){
      event.preventDefault();

      const animal = $(".get_animal").val();
      const animalName = $(".get_animalName").val();

      let newData = {
        animal: animal,
        animalName: animalName
      };

      $.ajax({
        type: "POST",
        url: animalsUrl,
        dataType: "json",
        data: newData,
      }).done(function(data){
        insertAnimals([data]);
      }).fail(function(error){
        console.log(error);
      });
    });
  };

  addAnimal();

  // removing animals from shelter

  removeAnimal = () => {
    list.on("click", ".delete", function(event) {
      let id = $(this).parent().data('id');

      $(this).parent().fadeOut();

      $.ajax({
        url: animalsUrl + id,
        type: "DELETE",
        dataType: "json",
      }).done(function(data){

      }).fail(function(error){
        console.log(error);
      });
    });
  };

  removeAnimal();

  // editing existing animal

  editAnimal = () => {
    list.on("click", ".edit", function(event) {
      if($(this).data('editMode')) {
        $(this).data('editMode', false);
        $(this).text('Edit');
        $(this).parent().find('h3, h4').css('background-color', 'transparent').attr('contenteditable', false)

        let id = $(this).parent().data('id');
        let animal = $(this).parent().find('h3').text();
        let animalName = $(this).parent().find('h4').text();

        let newData = {
          animal: animal,
          animalName: animalName,
        };

        $.ajax({
          url: animalsUrl + id,
          type: 'PUT',
          dataType: 'json',
          data: newData,
        }).done(function(data){
          
        }).fail(function(error){
          console.log(error);
        });

      } else {
        $(this).data('editMode', true);
        $(this).text('Confirm');
        $(this).parent().find('h3, h4').css('background-color', 'white').attr('contenteditable', true);
      };
    });
  };

  editAnimal();
});
