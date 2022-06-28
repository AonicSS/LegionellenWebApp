import React, {useEffect} from 'react';
import {useIntl} from 'react-intl';
import * as Scroll from 'react-scroll';
import Translate from '../../utils/translate';
import {useDispatch, useSelector} from 'react-redux';
import {SET_ANSWER, SET_APP_STEP, SET_CURRENT_QUESTION, SET_UPLOAD} from '../../redux/actions/App';
import {ReactComponent as Check} from '../../../icons/check.svg';
import {ReactComponent as Decline} from '../../../icons/times.svg';

import ImageUploading, {ImageListType} from "@gfnork/react-images-uploading";
import classnames from "classnames";
import filesize from "filesize";

import {AppReduxStoreProps} from '../../redux/reducers/App';
import {ReactComponent as XCircleInvertedIcon} from "../../icons/x-circled-inverted.svg";
import {BaseComponentProps} from "../../shared/interfaces/components";

const Uploader = ({
					  uploadId,
				  }: { uploadId: string }) => {
	const dispatch = useDispatch();

	const currentAppData = useSelector(
		(state: AppReduxStoreProps) => state.appData
	);

	const uploads = currentAppData.uploads;
	const maxNumber = 69;

	const onChange = (
		imageList: ImageListType,
		addUpdateIndex: number[] | undefined
	) => {
		// data for submit
		console.log(imageList, addUpdateIndex);
		dispatch({
			type: SET_UPLOAD,
			payload: {
				uploads: {
					...uploads,
					[uploadId]: (imageList)
				}
			},
		});
	};


	return (
		<>
			<div>
				<ImageUploading
					multiple
					value={(uploads as any)[uploadId]}
					onChange={onChange}
					maxNumber={maxNumber}
					dataURLKey="data_url"
					maxFileSize={20000000}
					acceptType={['jpg', 'pdf']}
				>
					{({
						  imageList,
						  onImageUpload,
						  onImageRemoveAll,
						  onImageUpdate,
						  onImageRemove,
						  isDragging,
						  dragProps,
					  }) => (
						// write your building UI
						<div className="upload__image-wrapper">
							<div
								className={"tw-border tw-border-dark-grey tw-flex tw-items-center"} {...dragProps}>
								<button
									style={isDragging ? {color: 'red'} : undefined}
									className={"tw-bg-red tw-text-white tw-uppercase tw-spacing tw-tracking-wider tw-p-2 tw-m-2"}
									onClick={onImageUpload}
								>
									Upload
								</button>
								<div className={"tw-flex-grow tw-text-right tw-m-2"}>
									JPG oder PDF hier hochladen | max. 20 MB
								</div>
							</div>
							<div className={"tw-p-2"}>
								{imageList.map((image, index) => (
									<div key={index} className={"tw-my-6 image-item tw-flex tw-items-center"}>
										<div className={"tw-flex-grow tw-pr-2"}>
											{image!.file!.name}
										</div>
										<div className={"tw-p-2x"}>
											{filesize(image!.file!.size)}
										</div>
										<div className="image-item__btn-wrapper tw-pl-2">
											<button onClick={() => onImageRemove(index)}><XCircleInvertedIcon/></button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</ImageUploading>
			</div>
		</>
	);
};

export default Uploader;
