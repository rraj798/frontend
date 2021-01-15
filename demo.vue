<template>
  <b-container fluid>
    <h2>Form</h2>
    <b-row>
      <b-col sm="4" style="background-color:#f1f1f1">
        <b-form autocomplete="off" class="small" style="margin-top:1%">
          <!-- Form : Name -->
          <b-form-group
            id="input-group-1"
            label="Name : "
            label-for="input-name"
            label-cols-sm
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="8"
          >
            <b-form-input
              id="input-name"
              v-model="form.name"
              type="text"
            ></b-form-input>
            <label id="input-name-error" class="text-danger small invisible">{{
              getNameValiationError
            }}</label>
          </b-form-group>
          <!-- Form : Email -->
          <b-form-group
            id="input-group-2"
            label="Email : "
            label-for="input-email"
            label-cols-sm
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="8"
          >
            <b-form-input
              id="input-email"
              v-model="form.email"
              type="email"
            ></b-form-input>
            <label id="input-email-error" class="text-danger small invisible">{{
              getEmailValiationError
            }}</label>
          </b-form-group>
          <!-- Form : DOB -->
          <b-form-group
            id="input-group-3"
            label="DOB : "
            label-for="input-dob"
            label-cols-sm
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="8"
          >
            <b-form-input
              id="input-dob"
              v-model="form.dob"
              type="date"
            ></b-form-input>
            <label id="input-dob-error" class="text-danger small invisible">{{
              getdobValiationError
            }}</label>
          </b-form-group>
          <!-- Form : Birth Place -->
          <b-form-group
            id="input-group-4"
            label="Place : "
            label-for="input-pob"
            label-cols-sm
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="8"
          >
            <b-form-input
              id="input-pob"
              v-model="form.pob"
              type="text"
            ></b-form-input>
            <label id="input-pob-error" class="text-danger small invisible">{{
              getpobValiationError
            }}</label>
          </b-form-group>
          <!-- Form : Gender -->
          <b-form-group
            id="input-group-5"
            label="Gender : "
            label-cols-sm
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="8"
          >
            <b-form-select
              v-model="form.gender"
              :options="[
                { value: null, text: 'Select Gender', disabled: true },
                { value: 'm', text: 'Male' },
                { value: 'f', text: 'Female' }
              ]"
            ></b-form-select>
            <label
              id="input-gender-error"
              class="text-danger small invisible"
              >{{ getGenderValiationError }}</label
            >
          </b-form-group>
          <!-- Form : Address -->
          <b-form-group
            id="input-group-6"
            label="Address : "
            label-for="input-address"
            label-cols-sm
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="8"
          >
            <b-form-textarea
              v-model="form.address"
              id="input-address"
              placeholder="Enter Address"
            ></b-form-textarea>
            <label
              id="input-address-error"
              class="text-danger small invisible"
              >{{ getAddressValiationError }}</label
            >
          </b-form-group>
          <!-- Form : Occupation -->
          <b-form-group
            id="input-group-7"
            label="Occupation : "
            label-for="input-occu"
            label-cols-sm
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="8"
          >
            <b-form-input
              id="input-occu"
              v-model="form.occu"
              type="text"
            ></b-form-input>
            <label id="input-occu-error" class="text-danger small invisible">{{
              getOccuValiationError
            }}</label>
          </b-form-group>
          <!-- Form : Marital Status -->
          <b-form-group
            id="input-group-8"
            label="Marital Status : "
            v-slot="{ ariaDescribedby }"
            label-cols-sm
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="8"
          >
            <b-form-radio-group
              class="pt-2"
              v-model="form.marrital"
              :options="['Married', 'Unmarried']"
              :aria-describedby="ariaDescribedby"
            ></b-form-radio-group>
            <label
              id="input-marrital-error"
              class="text-danger small invisible"
              >{{ getMarritalValiationError }}</label
            >
          </b-form-group>
          <!-- Form : Buttons -->
          <b-button block @click="onSubmit" variant="primary">Submit</b-button>
          <b-button block @click="onReset" variant="danger">Reset</b-button>
        </b-form>
      </b-col>
      <b-col sm="8">
        <b-table
          small
          light
          hover
          head-variant="dark"
          table-variant="primary"
          :items="items"
          :fields="fields"
          class="sm"
        >
          <template #cell(dmlOp)="row">
            <b-button-group vertical size="sm">
              <b-button variant="warning" @click="onUpdate(row.index)"
                >Update</b-button
              >
              <b-button
                v-b-modal.modal-prevent-closing
                variant="light"
                @click="onClone(row.index)"
                >Clone</b-button
              >
              <b-button variant="danger" @click="onDelete(row.index)"
                >Delete</b-button
              >
            </b-button-group>
          </template>
        </b-table>

        <div
          id="msg-alert"
          class="alert alert-danger alert-dismissible fade show invisible"
          role="alert"
        >
          <h4 class="alert-heading">Already Exists!</h4>
          <hr />
          <p>
            The email address you have provided already exists in our database
            please reenter a new email id.
          </p>
        </div>
      </b-col>
    </b-row>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      :title="oldName"
      button-size="sm"
      hide-footer
    >
      <form>
        <!-- Form : Clone-Name -->
        <b-form-group
          id="clone-group-1"
          label="Name : "
          label-for="clone-name"
          label-cols-sm
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="8"
        >
          <b-form-input
            id="clone-name"
            v-model="clone.name"
            type="text"
          ></b-form-input>
          <label id="clone-name-error" class="text-danger small">{{
            getCloneNameValiationError
          }}</label>
        </b-form-group>
        <b-button block @click="onCloneSubmit" variant="primary"
          >Submit</b-button
        >
      </form>
    </b-modal>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  name: "demo-component"
})
export default class DemoComponent extends Vue {
  private form = {
    name: "rahul raj",
    email: "rraj798@gmail.com",
    dob: "01-01-2008",
    pob: "bgp",
    gender: "m",
    address: "jhjahs",
    occu: "dec",
    marrital: "married"
  };
  private fields = [
    "name",
    "email",
    "dob",
    "pob",
    "gender",
    "address",
    "occupation",
    "marritalStatus",
    "dmlOp"
  ];

  private items: Array<items> = [];
  private updateCheck = false;
  private chgIndex = -1;
  private clone = {
    name: "username copy"
  };
  private oldName = "Hello ";

  // Form Validation : Name
  get getNameValiationError(): string {
    if (this.form.name === "") {
      return "Name is required";
    } else if (/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(this.form.name)) {
      return "Special Characters are not allowed";
    }
    return "";
  }

  // Form Validation : Email
  get getEmailValiationError(): string {
    if (this.form.email === "") {
      return "Email is required";
    } else if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        this.form.email
      )
    ) {
      return "";
    }
    return "You have entered an invalid email address!";
  }
  // Form VAlidation : DOB
  get getdobValiationError(): String {
    if (this.form.dob === "") {
      return "Date of Birth Cannot be Blank";
    } else if (new Date().getTime() < new Date(this.form.dob).getTime()) {
      return "Date of Birth cannot be more than today's date ";
    }
    return "";
  }

  get getpobValiationError(): String {
    if (this.form.pob === "") {
      return "Place of Birth cannot be blank";
    }
    return "";
  }

  get getGenderValiationError(): String {
    if (this.form.gender === "") {
      return "Please select a gender";
    }
    return "";
  }

  get getAddressValiationError(): String {
    if (this.form.address === "") {
      return "Address cannot be blank";
    }
    return "";
  }

  get getOccuValiationError(): String {
    if (this.form.occu === "") {
      return "Occupation cannot be blank";
    }
    return "";
  }

  get getMarritalValiationError(): String {
    if (this.form.marrital === "") {
      return "Please select your marrital status";
    }
    return "";
  }

  get getCloneNameValiationError(): String {
    if (
      this.clone.name.trim() ===
      (this.chgIndex === -1 ? "" : this.items[this.chgIndex].name.trim())
    ) {
      return "Cannot clone with same name";
    } else if (/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(this.clone.name)) {
      return "Special Characters are not allowed";
    }
    return "";
  }

  private onSubmit() {
    const eleName = document.getElementById("input-name-error");
    const eleEmail = document.getElementById("input-email-error");
    const eleDob = document.getElementById("input-dob-error");
    const elePob = document.getElementById("input-pob-error");
    const eleGen = document.getElementById("input-gender-error");
    const eleAddress = document.getElementById("input-address-error");
    const eleOccu = document.getElementById("input-occu-error");
    const eleMarrital = document.getElementById("input-marrital-error");

    //Alert Box
    const eleAlert = document.getElementById("msg-alert");

    eleName?.classList.remove("invisible");
    eleEmail?.classList.remove("invisible");
    eleDob?.classList.remove("invisible");
    elePob?.classList.remove("invisible");
    eleGen?.classList.remove("invisible");
    eleAddress?.classList.remove("invisible");
    eleOccu?.classList.remove("invisible");
    eleMarrital?.classList.remove("invisible");

    let item_email: string[] = [];
    this.items.forEach(element => {
      item_email.push(element.email.toUpperCase().trim());
    });

    if (
      this.getNameValiationError === "" &&
      this.getEmailValiationError === "" &&
      this.getdobValiationError === "" &&
      this.getpobValiationError === "" &&
      this.getGenderValiationError === "" &&
      this.getAddressValiationError === "" &&
      this.getOccuValiationError === "" &&
      this.getMarritalValiationError === ""
    ) {
      if (this.items.length === 0) {
        this.tblDtaLoad();
      } else if (item_email.includes(this.form.email.toUpperCase().trim())) {
        eleAlert?.classList.replace("invisible", "visible");
        setTimeout(function() {
          eleAlert.className = eleAlert.className.replace(
            "visible",
            "invisible"
          );
        }, 5000);
      } else {
        this.tblDtaLoad();
      }
    }
  }

  // Table Buttons //
  // Table Buttons : Delete
  private onDelete(index: number) {
    this.items.splice(index, 1);
  }

  // Table Buttons : Update
  private onUpdate(index: number) {
    this.form.name = this.items[index].name;
    this.form.email = this.items[index].email;
    this.form.dob = this.items[index].dob;
    this.form.pob = this.items[index].pob;
    this.form.gender = this.items[index].gender;
    this.form.address = this.items[index].address;
    this.form.occu = this.items[index].occupation;
    this.form.marrital = this.items[index].marritalStatus;

    this.onDelete(index);
  }
  // Table Buttons : Clone
  private onClone(index: number) {
    console.log(index);
    this.chgIndex = index;
    console.log(this.items[index].name);
    this.oldName = this.oldName + this.items[index].name;
    this.clone.name = this.items[index].name + " Copy";
  }

  private onReset() {
    this.form.name = "";
    this.form.email = "";
    this.form.dob = "";
    this.form.pob = "";
    this.form.gender = "";
    this.form.address = "";
    this.form.occu = "";
    this.form.marrital = "";

    const eleName = document.getElementById("input-name-error");
    const eleEmail = document.getElementById("input-email-error");
    const eleDob = document.getElementById("input-dob-error");
    const elePob = document.getElementById("input-pob-error");
    const eleGen = document.getElementById("input-gender-error");
    const eleAddress = document.getElementById("input-address-error");
    const eleOccu = document.getElementById("input-occu-error");
    const eleMarrital = document.getElementById("input-marrital-error");

    eleName?.classList.add("invisible");
    eleEmail?.classList.add("invisible");
    eleDob?.classList.add("invisible");
    elePob?.classList.add("invisible");
    eleGen?.classList.add("invisible");
    eleAddress?.classList.add("invisible");
    eleOccu?.classList.add("invisible");
    eleMarrital?.classList.add("invisible");
  }

  private onCloneSubmit() {
    console.log("Name : " + this.clone.name);
    console.log("ChangeInd Name : " + this.items[this.chgIndex].name);
    if (this.getCloneNameValiationError === "") {
      this.tblCloneDtaLoad(this.clone.name);
      document.getElementById("modal-prevent-closing")?.click();
    }
  }

  private tblDtaLoad() {
    this.items.push({
      name: this.form.name,
      email: this.form.email,
      dob: this.form.dob,
      pob: this.form.pob,
      gender: this.form.gender,
      address: this.form.address,
      occupation: this.form.occu,
      marritalStatus: this.form.marrital,
      dmlOp: ""
    });
    // this.onReset();
  }

  private tblCloneDtaLoad(p_name: string) {
    this.items.push({
      name: p_name,
      email: this.items[this.chgIndex].email,
      dob: this.items[this.chgIndex].dob,
      pob: this.items[this.chgIndex].pob,
      gender: this.items[this.chgIndex].gender,
      address: this.items[this.chgIndex].address,
      occupation: this.items[this.chgIndex].occupation,
      marritalStatus: this.items[this.chgIndex].marritalStatus,
      dmlOp: ""
    });
    this.oldName = "Hello ";
    this.clone.name = "";
  }
}

export interface items {
  name: string;
  email: string;
  dob: string;
  pob: string;
  gender: string;
  address: string;
  occupation: string;
  marritalStatus: string;
  dmlOp: string;
}
</script>

<style lang="scss"></style>
