function Cart() {
  //this.cartData = JSON.parse(localStorage.getItem("cartData"));
  this.cartData = {};
  if (localStorage.getItem("cartData")) {
    this.cartData = JSON.parse(localStorage.getItem("cartData"));
  } else {
    this.cartData = {};
  }
}
Cart.prototype.saveData = function (id, num, termi) {
  if (this.cartData[id] === undefined || termi) {
    this.cartData[id] = num;
  } else {
    this.cartData[id] += num;
  }
  console.log(this.cartData);
  localStorage.setItem("cartData", JSON.stringify(this.cartData));
};

Cart.prototype.showList = function () {
  this.cartList = document.getElementById("cartList");
  let productData = JSON.parse(localStorage.getItem("productData"));
  let str = "";
  for (let id in this.cartData) {
    str += `
    <tr data-id="${id}" valign="bottom">
    <td><span style="line-height:120px"><input type="checkbox" class="ck"></span></td>
    <td><img src="${productData[id].imgsrc}" class="minimg"></td>
     <td><span style="line-height:120px">${productData[id].title}</span></td>
     <td class="minus"width=120px style="cursor: pointer;"><span style="color: red;line-height:120px;font-size:36px;">-</span></td>
     <td><input style="margin-top:45px;width:40px" type="text"class="num"style="width:40px" value="${
       this.cartData[id]
     }" ></td>
     <td class="plus"width=120px style="cursor: pointer;"><span style="color: red;line-height:120px;font-size:36px;">+</span></td>
     <td class="price"><span style="line-height:120px">${
       productData[id].price
     }</span></td>
     <td class="perTotalPrice" style="padding-top:53px;width:150px" ><span>${
       this.cartData[id] * productData[id].price
     }</span></td>
     <td style="padding-top:53px;"><input type="button" value="删除" class="delBtn"></td>
     </tr>
  `;
  }
  this.cartList.innerHTML = str;
};
Cart.prototype.updateData = function () {
  this.checkAll = document.getElementById("checkAll");
  this.totalPrice = document.getElementById("totalPrice");
  this.list = this.cartList.querySelectorAll("tr");
  this.ck = this.cartList.querySelectorAll(".ck");
  this.minus = this.cartList.querySelectorAll(".minus");
  this.plus = this.cartList.querySelectorAll(".plus");
  this.num = this.cartList.querySelectorAll(".num");
  this.price = this.cartList.querySelectorAll(".price");
  this.perTotalPrice = this.cartList.querySelectorAll(".perTotalPrice");
  console.log(this.backdet);
  for (let i = 0; i < this.minus.length; i++) {
    this.minus[i].onclick = () => {
      this.num[i].value--;
      if (this.num[i].value <= 1) {
        this.num[i].value = 1;
      }
      update(i);
      this.getTotalPrice();
    };
    this.plus[i].onclick = () => {
      this.num[i].value++;
      if (this.num[i].value >= 99) {
        this.num[i].value = 99;
      }
      update(i);
      this.getTotalPrice();
    };
    this.num[i].oninput = () => {
      if (this.num[i].value <= 1) {
        this.num[i].value = 1;
      }
      if (this.num[i].value >= 99) {
        this.num[i].value = 99;
      }
      update(i);
      this.getTotalPrice();
    };
    this.ck[i].onclick = () => {
      let count = 0;
      for (let j = 0; j < this.ck.length; j++) {
        if (this.ck[j].checked) {
          count++;
        }
      }
      if (count == this.ck.length) {
        this.checkAll.checked = true;
      } else {
        this.checkAll.checked = false;
      }
      this.getTotalPrice();
    };
  }
  let update = (i) => {
    this.perTotalPrice[i].innerText =
      this.num[i].value * this.price[i].innerText;
    let id = this.list[i].getAttribute("data-id");
    let num = this.num[i].value;
    this.saveData(id, num, true);
  };
  this.checkAll.onclick = () => {
    for (let i = 0; i < this.ck.length; i++) {
      this.ck[i].checked = this.checkAll.checked;
    }
    this.getTotalPrice();
  };
};
Cart.prototype.getTotalPrice = function () {
  let total = 0;
  for (let i = 0; i < this.ck.length; i++) {
    if (this.ck[i].checked) {
      total += Number(this.perTotalPrice[i].innerText);
    }
    this.totalPrice.innerText = total;
  }
};
Cart.prototype.removeData = function () {
  this.delBtn = this.cartList.querySelectorAll(".delBtn");
  for (let i = 0; i < this.delBtn.length; i++) {
    this.delBtn[i].onclick = () => {
      this.cartList.removeChild(this.list[i]);
      this.ck[i].checked = false;
      let id = this.list[i].getAttribute("data-id");
      delete this.cartData[id];
      localStorage.setItem("cartData", JSON.stringify(this.cartData));
      this.getTotalPrice();
    };
  }
};
