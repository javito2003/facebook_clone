import React from "react";
import UserNav from "./UserNav";

const UserAvatar = ({ user }) => {
  return (
    <div className="bg-white w-screen ">
      <div className="flex justify-center overflow-hidden">
        <img
          src="https://scontent.fcor4-1.fna.fbcdn.net/v/t31.18172-8/15493733_632661176936131_6528865178704959966_o.jpg?_nc_cat=100&ccb=1-3&_nc_sid=e3f864&_nc_eui2=AeGTkFUX-rOuwxNJAfaVsAnnrrz_5poQtxCuvP_mmhC3EG0Y4X2w-cJZBbiOtR-UuGQ9QDCpbkSeJMnCEp3Mk1RL&_nc_ohc=DW2_B0aj3ykAX_lrD8j&tn=Z-cJnqeFeNyjm4Rp&_nc_ht=scontent.fcor4-1.fna&oh=aa2ce99555084dd39cdbbe4dedb201d0&oe=60DC2E79"
          alt=""
          className='block'
        />
      </div>
    </div>
  );
};

export default UserAvatar;
