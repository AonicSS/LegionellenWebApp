import React from 'react';

export interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
	children: React.ReactNode;
}

const Layout = ({ children, className = '', ...props }: LayoutProps) => {
	return (
		<>
			<main className={className} {...props}>
				{children}
			</main>
		</>
	);
};

export default Layout;
