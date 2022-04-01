import React from 'react';

export interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
	children: React.ReactNode;
}

const Layout = ({ children, className = '', ...props }: LayoutProps) => {
	return (
		<>
			<main className={className} {...props}>
				{children}
				{/* <p className="tw-font-size-footer-phone">
					Mo bis Fr von 08-18 Uhr für Ihre Fragen erreichbar:{' '}
					<span className="tw-font-size-bold">06196 522 7040</span>
				</p> */}
			</main>
		</>
	);
};

export default Layout;
