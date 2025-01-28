import InputAreaText from "../../Components/InputAreaText";
import InputText from "../../Components/InputText";

export default function FormCreate() {
  return (
    <section id="form-create">
      <div className="container">
        <form className="form-create__container">
          <div className="wrapper">
            <div className="input__row">
              <InputText
                className="input__text form-input"
                label="Name"
                labelRequired
                id="name"
              />
              <InputText
                className="input__text form-input"
                label="Slug"
                labelRequired
                id="slug"
              />
            </div>
            <div>
              <InputAreaText label="Description" labelRequired />
            </div>
          </div>
          <div className="wrapper"></div>
        </form>
      </div>
    </section>
  );
}
