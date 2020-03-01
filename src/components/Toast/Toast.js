import {toast} from "react-toastify";

export default function Toast(props) {
	if(props.type === "success") {
		toast.success(props.msg, {
			position: "bottom-right",
			autoClose: 5000,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true
		});
	}

	if(props.type === "error") {
		// console.log(props.error);
        
		let msg = "";

		try {
			if(!props.error.status) {
				msg = props.error;
			} else {
				msg = `${props.error.status}: ${props.error.statusText}`;
			}
		} catch(e) {
			console.log(e);
			msg = "Unknown error occurred. Please try again later.";
		}

		toast.error(msg, {
			position: "bottom-right",
			autoClose: 5000,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true
		});
	}
}
