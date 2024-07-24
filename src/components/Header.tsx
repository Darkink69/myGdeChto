import { observer } from "mobx-react-lite";

const Header = observer(() => {
  return (
    <>
      <div>
        <p className="font-sans text-2xl text-gray-300">ЧёКаво</p>
      </div>
    </>
  );
});

export default Header;
