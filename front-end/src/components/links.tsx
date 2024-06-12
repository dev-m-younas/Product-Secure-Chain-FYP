import { Link, Text } from "native-base";
import { NavLink } from "react-router-dom";

export function Links() {
  return (
    <>
      <NavLink
        className={(navData) => (navData.isActive ? "link-active" : "link")}
        to="/all-products">
        <Text fontWeight={"semibold"} fontSize="lg">
          Products
        </Text>
      </NavLink>
      
      
    </>
  );
}
