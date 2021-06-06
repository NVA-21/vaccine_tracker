import { PUBLIC_IMAGE_PATH } from '../../utils/Constants';
import './Modal.css';

export default function Modal(props) {
	return (
		<>
			{props.show ? (
				<div onClick={props.close} className="modalBase"></div>
			) : null}

			<div
				className="modal-wrapper"
				style={{
					transform: props.show
						? 'translate(-50%, -50%)'
						: 'translate(-50%,-100vh)',
					opacity: props.show ? '1' : '0',
					zIndex: props.show ? '1000' : '-1000'
				}}
			>
				<div className="modal-header">
					<p>{props.title}</p>
					<span onClick={props.close} className="modal-close-btn">
						<img src={PUBLIC_IMAGE_PATH + 'cancel button.png'} alt="X" />
					</span>
				</div>
				<div className="modal-content">
					<div className="modal-body">{props.children}</div>
					{props.footer && (
						<div className="modal-footer">
							<button onClick={props.close} className="btn-cancel">
								Close
							</button>

							<button onClick={props.close} className="btn-cancel">
								Close
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
