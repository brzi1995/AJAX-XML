document.addEventListener("DOMContentLoaded", function () {
  
  /* AJAX zahtjev - Popuni listu sa žanrovima */  
  var zanrovi = document.getElementById("zanrovi");
  
  var xhttp = new XMLHttpRequest();
      
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4  &&  this.status == 200){
          var podaci = "<option value='0'>Odaberite žanr</option>", zanrId, nazivZanra;
          var xml = this.responseXML;
          var zanrKolekcija = xml.getElementsByTagName("zanr");
          for (let i = 0; i < zanrKolekcija.length; i++) {
            zanrId = zanrKolekcija[i].getElementsByTagName("zanrId")[0].innerHTML;
            nazivZanra = zanrKolekcija[i].getElementsByTagName("nazivZanra")[0].innerHTML;
            podaci += "<option value='" + zanrId + "'>" + nazivZanra + "</option>";
          }
          zanrovi.innerHTML = podaci; 
        }
    };

	// xhttp.open("GET", "http://hlapcic-education.atwebpages.com/zanrovi.php", true);
    xhttp.open("GET", "http://frodo.ess.hr/api/svi-zanrovi.php", true);
    xhttp.send();
    
    /* AJAX zahtjev - Filmovi po žanru */
    zanrovi.addEventListener("change", function(){
      var zanr = zanrovi.value;
      
      var xhttp = new XMLHttpRequest();
    
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4  &&  this.status == 200){
              var podaci = "", nazivFilma, godinaIzlaska, nazivZanra;
              var xml = this.responseXML;
              var filmKolekcija = xml.getElementsByTagName("film");
              for (let i = 0; i < filmKolekcija.length; i++) {
                nazivFilma = filmKolekcija[i].getElementsByTagName("nazivFilma")[0].innerHTML;
                godinaIzlaska = filmKolekcija[i].getElementsByTagName("godinaIzlaska")[0].innerHTML;
                nazivZanra = filmKolekcija[i].getElementsByTagName("nazivZanra")[0].innerHTML;
                podaci += "<li>" + nazivFilma + ", " + godinaIzlaska + " - " + nazivZanra + "</li>";
              }
              document.getElementById("filmovipozanru").innerHTML = podaci; 
            }
        };

		// xhttp.open("GET", "http://hlapcic-education.atwebpages.com/filmovi-po-zanru.php?zanr=" + zanr, true);
        xhttp.open("GET", "http://frodo.ess.hr/api/filmovi-po-zanru.php?zanr=" + zanr, true);
        xhttp.send();
  });
  
});