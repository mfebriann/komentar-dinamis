const btnSubmit = document.getElementById("kirim");
const username = document.getElementById("username");
const komentar = document.getElementById("komentar");
const image = document.getElementById("avatar");
const container = document.querySelector(".container");

btnSubmit.addEventListener("click", (e) => {
  if (komentar.value == "") {
    alert("Kolom komentar wajib diisi!");
  } else {
    const loading = document.querySelector(".spinner-loading");
    loading.style.display = "inherit";
    btnSubmit.style.display = "none";

    const avatar = document.createElement("img");

    // Bikin username
    const cetakUsername = document.createElement("p");
    const randomUsername = ["John", "Doe", "Jajang", "Cecep", "Milla", "Jessica", "Desti", "Rei", "Klarista", "Bambang"];
    cetakUsername.setAttribute("class", "tampilUsername");
    if (username.value == "") {
      const angkaAcak = randomUsername[Math.round(Math.random() * 9)];
      cetakUsername.append(angkaAcak);
      avatar.src = `person/${angkaAcak}.jpg`;
    } else {
      cetakUsername.append(username.value);
    }

    setTimeout(() => {
      loading.style.display = "none";
      btnSubmit.style.display = "inherit";

      const containerKomen = document.createElement("div");
      containerKomen.setAttribute("class", "container-komen");

      avatar.setAttribute("alt", "You Avatar");
      if (image.files[0]) {
        avatar.src = URL.createObjectURL(image.files[0]);
      } else if (image.src == "" && username.value != "") {
        avatar.src = `randomImages/${Math.round(Math.random() * 9 + 1)}.jpg`;
      }
      containerKomen.append(avatar);

      // Hasil komentar
      const hasilKomentar = document.createElement("div");
      hasilKomentar.setAttribute("class", "hasilKomentar");

      hasilKomentar.append(cetakUsername);

      // Bikin komentar
      const cetakKomentar = document.createElement("p");
      cetakKomentar.setAttribute("class", "tampilKomentar");
      cetakKomentar.append(komentar.value);
      hasilKomentar.append(cetakKomentar);

      // Bikin tombol close
      const tombolSilang = document.createElement("img");
      tombolSilang.setAttribute("src", "close-line.svg");
      tombolSilang.classList.add("btnClose");
      hasilKomentar.append(tombolSilang);

      username.value = "";
      komentar.value = "";
      image.value = "";

      containerKomen.append(hasilKomentar);
      container.prepend(containerKomen);
    }, 3000);
  }
  e.preventDefault();
});

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("btnClose")) {
    const hapusAtauTidak = confirm("Apa kamu yakin, ingin menghapus komentar?");
    const activeKomen = document.getElementById("active-komen");
    if (hapusAtauTidak === true) {
      if (e.target.parentElement == activeKomen) {
        e.target.parentElement.style.display = "none";
      } else {
        e.target.parentElement.parentElement.style.display = "none";
      }
    }
  }
});

const btnClearAll = document.getElementById("btnClearAll");
btnClearAll.addEventListener("click", () => {
  if (container.children.length === 0) {
    alert("Belum ada komentar apapun");
  } else {
    const tanyaClearAll = confirm("Yakin ingin menghapus semua komentar?");
    if (tanyaClearAll) {
      const containerKomen = document.querySelectorAll(".container-komen");
      containerKomen.forEach((clearContainerKomen) => {
        container.removeChild(clearContainerKomen);
      });
    }
  }
});
