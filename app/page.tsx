import Button from "./component/Button";
import Conditonal from "./component/Cond";
import InputText from "./component/InputText";
import Latihan from "./component/Latihan";
import Note from "./component/Note";
import Soal from "./component/Soal";

const Home = () => {
  return (
    <main>
      <h1>Hello World</h1>
      <Latihan
        name="ihsan"
        username="ihsanabuhanifah"
        age={30}
        isVerified={true}
      />
      <Note title="Belajar ReactJS" status='warning' >
        <p>Saya belajar React</p>
      </Note>
      <Note title="Belajar TypeScript" status='warning' >
        <div className="bg-blue-500">
          <p className="text-white">Saya sedang belajar TypeScript</p>
        </div>
      </Note>

      <Note title="Belajar NestJS" status='warning' >
        <div className="bg-green-500">
          <p className="text-white">Saya sedang belajar NestJS untuk menjadi backend developer</p>
        </div>
      </Note>

      <Soal color="blue">
        <p>tessssssssssss</p>
      </Soal>

      <InputText
        name="s"
        id="s"
        value='ss'
        placeholder="username"
        type="text"
        isError
        messageError="Username not empty"
      />

      <Conditonal pesan="lorem" warna="biru" />
      
    </main>
  );
};

export default Home;
