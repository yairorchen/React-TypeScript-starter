import { User } from "./user-service";

export const createHandleInputChange = (
  setNewUser: React.Dispatch<React.SetStateAction<User>>
) => {
  return (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const field = event.target.name;
    let value: string | number | boolean = event.target.value;

    switch (event.target.type) {
      case "number":
        value = +value;
        break;
      case "range":
        value = +value;
        break;
      case "checkbox":
        value = (event.target as HTMLInputElement).checked;
        break;

      default:
        break;
    }

    setNewUser((prevState) => ({
        ...prevState, [field]: value
    }));
    console.log(event.target.value);
    
  };
};
