interface Props {
  name: string;
  username: string;
  age: number;
  isVerified: boolean;
}

export default function Latihan(props: Props) {
  console.log('props', props)
  return (
    <div className="container">
      <dl>
        <dt>Name: </dt>
        <dd>{props.name}</dd>
        <dt>Username: </dt>
        <dd>{props.username}</dd>
        <dt>Age: </dt>
        <dd>{props.age}</dd>
        <dt>Verified: </dt>
        <dd>{props.isVerified ? "yes" : "no"}</dd>
      </dl>
    </div>
  );
}
