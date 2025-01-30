import { useRef, useState } from "react";
import AreaText from "../../Components/AreaText";
import InputSwitch from "../../Components/InputSwitch";
import InputText from "../../Components/InputText";
import Primary from "../../Components/PrimaryAction";
import Wrapper from "../../Components/Wrapper";
import ErrorLabel from "../../Components/ErrorLabel";
import axiosClient from "../../api/axios-client";
import { useNavigate } from "react-router";

export default function FormCreate() {
  const name = useRef(null);
  const slug = useRef(null);
  const description = useRef(null);
  const allowed_domains = useRef(null);
  const limit_one_response = useRef(null);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const quest = {
      name: name.current?.value,
      slug: slug.current?.value,
      description: description.current?.value,
      allowed_domains: allowed_domains.current?.value
        ? allowed_domains.current?.value.split(", ")
        : [],
      limit_one_response: limit_one_response.current?.checked,
    };

    setErrors({});

    axiosClient
      .post("/forms", quest)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
      });
  };

  return (
    <section id="form-create">
      <div className="mx-auto pt-4 pb-36 md:container">
        <form
          className="flex flex-col items-center gap-2 px-2"
          onSubmit={onSubmitHandler}
        >
          <FormInformation
            name={name}
            slug={slug}
            description={description}
            allowed_domains={allowed_domains}
            limit_one_response={limit_one_response}
            errors={errors}
          />

          <div className="flex w-full max-w-[500px] justify-end border-t-[1px] border-zinc-300 py-2">
            {/* <button
              className="cursor-pointer rounded-lg bg-white px-4 py-2 text-sm font-bold text-sky-600 uppercase opacity-50 shadow-sm shadow-black/10 transition-all duration-300 ease-in-out hover:opacity-100"
              onClick={addQuestHandler}
            >
              Add Question
            </button> */}
            <Primary.Button className="!py-2 text-sm font-bold uppercase opacity-50 shadow-sm shadow-black/10 transition-all duration-300 ease-in-out hover:opacity-100">
              <span>Save</span>
            </Primary.Button>
          </div>
        </form>
      </div>
    </section>
  );
}

const FormInformation = ({
  name,
  slug,
  description,
  allowed_domains,
  limit_one_response,
  errors,
}) => {
  return (
    <Wrapper className="w-full max-w-[500px] space-y-2">
      <div className="flex gap-2">
        <div className="w-full">
          <InputText
            className="input__text form-input"
            label="Name"
            labelRequired
            id="name"
            ref={name}
          />

          <ErrorLabel value={errors.name} />
        </div>
        <div className="w-full">
          <InputText
            className="input__text form-input"
            label="Slug"
            labelRequired
            id="slug"
            ref={slug}
          />
          <ErrorLabel value={errors.slug} />
        </div>
      </div>
      <div>
        <AreaText label="Description" labelRequired ref={description} />
        <ErrorLabel value={errors.description} />
      </div>
      <div>
        <InputText
          className="input__text form-input"
          label="Allowed Domains"
          labelRequired
          id="allowed-domains"
          ref={allowed_domains}
        />
        <span className="block text-sm text-zinc-400">
          Separate them using the comma and space. Exp.{" "}
          <span className="font-semibold">webtech.id, worldskill.org</span>
        </span>
        <ErrorLabel value={errors.allowed_domains} />
      </div>
      <div className="mt-4 flex justify-between border-t-[1px] border-zinc-100 py-2">
        <div className="flex items-center gap-2">
          <span className="leading-tight">Limit one response</span>
          <InputSwitch id="limit-one-response" ref={limit_one_response} />
        </div>
      </div>
    </Wrapper>
  );
};

// const FormQuestion = () => {
//   const [quest, setQuest] = useState({
//     name: "",
//     choice_type: "short_answer",
//     choices: null,
//     is_required: false,
//   });

//   return (
//     <Wrapper className="w-full max-w-[500px] space-y-2">
//       <div className="flex gap-2">
//         <div className="flex-grow">
//           <InputGroup label="Question" labelRequired>
//             <InputGroup.Text
//               value={quest.name}
//               onChange={(e) =>
//                 setQuest((prev) => ({ ...prev, name: e.target.value }))
//               }
//             />
//             <InputGroup.Select
//               value={quest.choice_type}
//               onChange={(e) =>
//                 setQuest((prev) => ({ ...prev, choice_type: e.target.value }))
//               }
//             >
//               <InputGroup.Option value="short answer">
//                 Short Answer
//               </InputGroup.Option>
//               <InputGroup.Option value="paragraph">Paragraph</InputGroup.Option>
//               <InputGroup.Option value="date">Date</InputGroup.Option>
//               <InputGroup.Option value="miltiple choice">
//                 Multiple Choice
//               </InputGroup.Option>
//               <InputGroup.Option value="dropdown">Dropdown</InputGroup.Option>
//               <InputGroup.Option value="checkboxes">
//                 Checkboxes
//               </InputGroup.Option>
//             </InputGroup.Select>
//           </InputGroup>
//         </div>
//       </div>
//       <div className="flex w-full items-center justify-between border-t-[1px] border-zinc-100 py-2">
//         {/* <button
//           id={id}
//           onClick={deleteQuestHandler}
//           className="cursor-pointer px-2 text-red-600 transition-colors duration-300 ease-in-out hover:text-red-700"
//         >
//           <BinIcon className="pointer-events-none" />
//         </button> */}
//         <Checkbox
//           label="Is Required"
//           onChange={(e) =>
//             setQuest((prev) => ({
//               ...prev,
//               is_required: e.target.checked,
//             }))
//           }
//           checked={quest.is_required}
//         />
//       </div>
//     </Wrapper>
//   );
// };
