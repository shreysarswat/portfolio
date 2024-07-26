import Link from "next/link";
import Image from "next/image";
import { logo } from "@/public";
import { useState } from "react";
import { navVariants } from "@/motion";
import { TextHover } from "@/animation";
import { navbarItems } from "@/constants";
import { ArrowUpRight } from "lucide-react";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import MobileNav from "./MobileNav";


export default function Navbar() {
	const [hidden, setHidden] = useState(false);
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious();
		if (previous && latest > previous) {
			setHidden(true);
		} else {
			setHidden(false);
		}
	});

	return (
		<>
			<motion.nav
				variants={navVariants}
				className="w-full h-[8vh] padding-x fixed top-0 left-0 z-50 backdrop-blur-[7px] flex items-center justify-between sm:hidden xm:hidden md:hidden"
				animate={hidden ? "hidden" : "vissible"}>
				<div className="w-[50%]">
					{/* TODO: MAKE IT BIGGER AND SECONDARY COLOR */}
					<Link href={"/"}>
						<div>Shrey<span>.</span> </div>
					</Link>
				</div>
				<div className="flex justify-end items-center gap-x-[20px] w-[50%]">
					{navbarItems.map((item) => (
						<Link
							key={item.id}
							className={`w-fit paragraph font-medium font-NeueMontreal text-secondry capitalize flex ml flex-col hover`}
							href={item.href}>
							<TextHover
								titile1={item.title}
								titile2={item.title}
							/>
						</Link>
					))}
					<div className="flex items-center gap-[5px] group">
						<div className="rounded-[50px] border border-[#21212199] group-hover:bg-secondry  py-[3px] px-[12px] cursor-pointer">
							<Link
								className="paragraph font-NeueMontreal text-secondry uppercase group-hover:text-background transition-all  transform duration-[0.3s] ease-[.215,.61,.355,1]"
								href="/contact">
								Let's Connect
							</Link>
						</div>
							<div className="w-[33px] flex items-center justify-center h-[33px] border border-[#21212199] rounded-full p-[1px] sm:p-[30px] xm:pb-[30px]  group-hover:bg-secondry transition-all transform duration-[0.3s] ease-[.215,.61,.355,1] cursor-pointer xm:hidden sm:hidden">
								<p className="font-normal text-secondry group-hover:text-background">
									<ArrowUpRight
										size={24}
										strokeWidth={1.25}
									/>
								</p>
							</div>
					</div>
				</div>

			</motion.nav>
			<MobileNav />
		</>
	);
}
