import React from 'react';
import { PUBLIC_IMAGE_PATH } from '../../utils/Constants';
import './ProfileCard.css';

const ProfileCard = props => {
	return (
		<div className="profileCard">
			<div className="main-card">
				<div className="main-content">
					<div className="img-box">
						<img
							src={PUBLIC_IMAGE_PATH + props.profileImage}
							alt="profile-pic"
							height={150}
						/>
					</div>
					<div className="contentBox">
						<h2 className="profileName">{props.name}</h2>
						<h4 className="profileDesignation">{props.designation}</h4>
					</div>
				</div>
				<div className="social-profiles">
					{props.github ? (
						<a href={props.github} target="_blank" rel="noreferrer">
							<img
								src={PUBLIC_IMAGE_PATH + 'github.svg'}
								alt="Linkedin"
								width={30}
								height={'auto'}
							/>
						</a>
					) : (
						<a href={props.behance} target="_blank" rel="noreferrer">
							<img
								src={PUBLIC_IMAGE_PATH + 'behance.svg'}
								alt="Behance"
								width={30}
								height={'auto'}
							/>
						</a>
					)}

					<a href={props.linkedin} target="_blank" rel="noreferrer">
						<img
							src={PUBLIC_IMAGE_PATH + 'linkedin.svg'}
							alt="Linkedin"
							width={30}
							height={'auto'}
						/>
					</a>

					<a href={props.mail} target="_blank" rel="noreferrer">
						<img
							src={PUBLIC_IMAGE_PATH + 'gmail.svg'}
							alt="Linkedin"
							width={30}
							height={'auto'}
						/>
					</a>
				</div>
			</div>
		</div>
	);
};

export default ProfileCard;
