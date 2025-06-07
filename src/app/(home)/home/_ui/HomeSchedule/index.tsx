import style from './HomeSchedule.module.scss';
import { Button } from "@/components/comp/Button";
import { SectionTitle } from "@/components/comp/SectionTitle";
import Image from "next/image";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddLocationIcon from '@mui/icons-material/AddLocation';

export const HomeSchedule = () => {
    return(
        <div className={style.homeschedule_content}>
            <div className={style.homeschedule_content_main}>
                
                <div className={style.homeschedule_content_main_title}>
                    <SectionTitle 
                        title="Programação e Horários de Missas"
                        align="center"
                    />
                </div>

                <div className={style.homeschedule_content_main_container}>
                    <div className={style.homeschedule_content_main_container_info}>
                        <div className={style.homeschedule_content_main_container_info_box}>

                            <h6>horários das missas</h6>

                            <h3>Programação das Missas na Semana</h3>

                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quae omnis sapiente tenetur aspernatur, sed ea distinctio debitis. Cupiditate iure aliquid illo?</p>
                        
                            <div className={style.homeschedule_content_main_container_info_box_schedule}>
                                <AccessTimeIcon/>
                                <div>
                                    <span>Qua, Qui e Sex: 19h.</span><br />
                                    <span>Sáb: 19h.</span><br />
                                    <span>Dom: 08h, 10h e 19h.</span>
                                </div>
                            </div>

                            <div className={style.homeschedule_content_main_container_info_box_schedule}>
                                <AddLocationIcon/>
                                <div>
                                    <span>Q. 108 Norte Alameda 2, 60 -</span><br />
                                    <span>Palmas TO</span>
                                </div>
                            </div>

                            <Button
                                label="acompanhar"
                                darkMode={true}
                            />
                        </div>
                    </div>

                    <div className={style.homeschedule_content_main_container_image}>
                        <Image
                            src='/images/paroquia.jpg'
                            fill
                            style={{objectFit: 'cover'}}
                            alt='paroquia'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}