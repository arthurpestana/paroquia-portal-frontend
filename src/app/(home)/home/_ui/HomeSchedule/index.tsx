import style from './HomeSchedule.module.scss';
import { Button } from "@/components/comp/Button";
import { SectionTitle } from "@/components/comp/SectionTitle";
import Image from "next/image";
import { AccessTimeOutlined, FmdGoodOutlined } from '@mui/icons-material';

export const HomeSchedule = () => {
    return (
        <div className={style.homeSchedule__content}>
            <SectionTitle
                subtitle='Missas'
                title="Programação e Horários de Missas"
                align="center"
            />
            <div className={style.homeSchedule__content__main}>
                <div className={style.homeSchedule__content__main__info}>
                    <div className={style.homeSchedule__content__main__info__header}>
                        <h4>horários das missas</h4>
                        <h2>Programação das Missas na Semana</h2>
                        <p>Earum quae omnis sapiente tenetur aspernatur, sed ea distinctio debitis. Cupiditate iure aliquid illo?</p>
                    </div>
                    <div className={style.homeSchedule__content__main__info__box}>
                        <div className={style.homeSchedule__content__main__info__box__schedule}>
                            <AccessTimeOutlined />
                            <div className={style.homeSchedule__content__main__info__box__schedule__time}>
                                <span>Qua, Qui e Sex: 19h.</span><br />
                                <span>Sáb: 19h.</span><br />
                                <span>Dom: 08h, 10h e 19h.</span>
                            </div>
                        </div>
                        <div className={style.homeSchedule__content__main__info__box__schedule}>
                            <FmdGoodOutlined />
                            <div className={style.homeSchedule__content__main__info__box__schedule__address}>
                                <span>Q. 108 Norte Alameda 2, 60 -</span><br />
                                <span>Palmas TO</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.homeSchedule__content__main__info__button}>
                        <Button
                            label="ACOMPANHAR"
                            darkMode={true}
                            onClick={() => {}}
                        />
                    </div>
                </div>
                <div className={style.homeSchedule__content__main__image}>
                    <Image
                        src='/images/paroquia.jpg'
                        fill
                        style={{ objectFit: 'cover' }}
                        alt='paroquia'
                    />
                </div>
            </div>
        </div>
    );
}