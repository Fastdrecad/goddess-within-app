import { Link } from "react-router-dom";
import { Container } from "reactstrap";

import CountdownTimer from "@/components/features/CountdownTimer";

const TopBar = () => (
  <div className="header-info">
    <Container>
      <div className="announcement">
        <span className="topbar-text">
          <p>
            <Link to="/shop">
              <strong>Black Friday Deals</strong> | Unlock savings up to
              <strong> 70% OFF</strong> across the store – hurry, limited time
              only!
            </Link>
          </p>
        </span>
        <CountdownTimer />
      </div>
    </Container>
  </div>
);

export default TopBar;
