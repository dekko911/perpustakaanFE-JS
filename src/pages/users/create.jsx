import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { InputCreate, InputCreateFile } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { AuthLayout } from "../../layouts/auth";
import { swalToast } from "../../lib/sweet-alert";
import { axios_api_init, cn } from "../../lib/utils";
import Loading from "/src/assets/images/loading.gif";

export const CreateUserPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPhoto, setShowPhoto] = useState(null);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData();

      form.name && formData.append("name", form.name);
      form.email && formData.append("email", form.email);
      form.password && formData.append("password", form.password);
      form.avatar && formData.append("avatar", form.avatar);

      const res = await axios_api_init.post(`/api/user`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
      });

      if (res.data) {
        swalToast("success", `${res.data.message}`, 235);
        navigate("/users");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="p-2 h-[74vh]">
        <form onSubmit={handleCreate} method="POST">
          <Label>Nama</Label>
          <InputCreate
            name="name"
            placeholder="Masukkan Nama Anda . . ."
            onKeyUp={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Label>Email</Label>
          <InputCreate
            type="email"
            name="email"
            placeholder="Masukkan Email Anda . . ."
            onKeyUp={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Label>Password</Label>
          <InputCreate
            type="password"
            name="password"
            placeholder="********"
            onKeyUp={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Label>Avatar</Label>
          <img
            src={showPhoto}
            alt="photo temp"
            className={cn(
              "size-28 my-3 rounded-md",
              showPhoto ? "block" : "hidden",
            )}
          />
          <InputCreateFile
            name="avatar"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setShowPhoto(URL.createObjectURL(file));
              } else {
                setShowPhoto("");
              }

              setForm({ ...form, avatar: file });
            }}
          />

          <Button disabled={isLoading}>
            {isLoading ? (
              <img src={Loading} alt="" className="w-5" />
            ) : (
              <FaSave />
            )}
            Simpan
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};
