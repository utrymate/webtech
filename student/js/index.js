$( document ).ready(function() {
    ShowCars();
});

function ShowCars() {
    let contents = $(".contents");
    contents.empty();
    contents.show();
    $(".form").hide();
    contents.append(`
        <table id="theTable">
            <tr>
                <th>Name</th>
                <th>Consumption</th>
                <th>Color</th>
                <th>Manufacturer</th>
                <th>Year</th>
                <th>Avalaible</th>
                <th>Horsepower</th>
            </tr>
        </table>
        `);

    $.get( "/cars", function( datas ) {
        datas.forEach(function(value) {
            $("#theTable").append(`
                <tr>
                    <td>${value.name}</td>
                    <td>${value.consumption}</td>
                    <td>${value.color}</td>
                    <td>${value.manufacturer}</td>
                    <td>${value.year}</td>
                    <td>${value.available}</td>
                    <td>${value.horsepower}</td>
                </tr>`);
        })
    });
}

function ShowManufacts() {
    let contents = $(".contents");
    contents.empty();
    contents.show();
    $(".form").hide();
    contents.append(`
    <table id="manuTable">
        <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Founded</th>
        </tr>
    </table>
    `);
    $.get( "/manufacturers", function( datas ) {
        datas.forEach(function(value) {
            $("#manuTable").append(`
                <tr>
                    <td>${value.name}</td>
                    <td>${value.country}</td>
                    <td>${value.founded}</td>
                </tr>
                `);
        })
    })
}

function ShowNames() {
    let contents = $(".contents");
    contents.empty();
    contents.show();
    $(".form").hide();
    $.get("/manufacturerNames", function ( datas ) {
        datas.forEach(function(value) {
            contents.append(`
                <div>
                <h2>${value}</h2>
                <button onclick="ShowTime('${value}')" >Show manufacture's cars</button>
                </div>`);
        })
    });
}

function ShowTime(manufacturer) {
    document.cookie = "name=" + manufacturer;
    let contents = $(".contents");
    contents.empty();
    contents.show();
    $(".form").hide();
    $.get( "/manufacturer", function( datas ) {
        datas.forEach(function(value) {
            contents.append(`
            <tr>
            <td><h4>${value.name}</h4></td>
            <td>${value.consumption}</td>
            <td>${value.color}</td>
            <td>${value.manufacturer}</td>
            <td>${value.year}</td>
            <td>${value.available}</td>
            <td>${value.horsepower}</td>
                </tr>`);
        })
    })
}

function hideContents() {
    $(".contents").hide();
    $(".form").show();
}

function addCar() {
    $(".form").html(`
    <table align="center">
    <caption>Add car</caption>
    <tr>
      <td>
      <div class="field">
            <label>
                <em>name</em>
            </label>
            <div class="field">
                <input type="text" name="name">
            </div>
        </div>

        <div class="field">
            <label>
                <em>consumption</em>
            </label>
            <div class="field">
                <input type="text" name="consumption" placeholder="...l/100km">
            </div>
        </div>

        <div class="field">
            <label>
                <em>color</em>
            </label>
            <div class="field">
                <input type="text" name="color">
            </div>
        </div>

        <div class="field">
            <label>
                <em>year</em>
            </label>
            <div class="field">
                <input type="number" name="year">
            </div>
        </div>

        <div class="field">
            <label>
                <em>manufacturer</em>
            </label>
            <div class="field">
                <input type="text" name="manufacturer">
            </div>
        </div>

        <div class="field">
            <label>
                <em>available</em>
            </label>
            <div class="field">
                <input type="number" name="available">
            </div>
        </div>

        <div class="field">
            <label>
                <em>horsepower</em>
            </label>
            <div class="field">
                <input type="number" name="horsepower" >
            </div>
        </div>

        <button type="submit" onclick="carSubmit()">Add</button>
      </td>
      <td>
      <img src="images/tesla.jpg" height="330">
      </td>
    </tr>
  </table>
        `);
    hideContents();
}

function carSubmit() {
    $.post("/addCar", {
        name : $( "input[name='name']" ).val(),
        color:  $( "input[name='color']" ).val(),
        consumption: $( "input[name='consumption']" ).val(),
        year: $( "input[name='year']" ).val(),
        manufacturer: $( "input[name='manufacturer']" ).val(),
        available: $( "input[name='available']" ).val(),
        horsepower: $( "input[name='horsepower']" ).val()
    }).done(ShowCars());
}

function addManufacturers() {
    $(".form").html(`
    <table align="center">
    <caption>Add manufacture</caption>
    <tr>
      <td>
        <div class="field">
        <label>
            <em>name</em>
        </label>
            <div class="field">
                <input type="text" name="name">
            </div>
        </div>

        <div class="field">
        <label>
            <em>country</em>
        </label>
            <div class="field">
                <input type="text" name="country">
            </div>
        </div>

        <div class="field">
        <label>
            <em>founded</em>
        </label>
            <div class="field">
                <input type="text" name="founded" placeholder="Month Day, Year">
            </div>
        </div>
      
        <button type="submit" onclick="manuSubmit()">Add</button>
        </td>
        <td>
        <img src="images/fact.jpg">
        </td>
      </tr>
    </table>
        `);
    hideContents();
}

function manuSubmit() {
    $.post("/addManufacturers", {
        name : $( "input[name='name']" ).val(),
        country: $( "input[name='country']" ).val(),
        founded: $( "input[name='founded']" ).val(),
    }).done(ShowManufacts());
}
