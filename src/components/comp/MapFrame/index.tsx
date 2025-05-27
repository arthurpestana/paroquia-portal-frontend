import React from 'react';

interface MapFrameProps {
  width?: string;
  height?: string;
}

export const MapFrame = ({
  width = '600px',
  height = '450px',
}: MapFrameProps) => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15707.670892195249!2d-48.3555156744371!3d-10.18733706245371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9324cb42b5bdc9e3%3A0xc8bc313ba13e5ae4!2sUNITINS%20-%20Campus%20Palmas!5e0!3m2!1spt-BR!2sbr!4v1747891676674!5m2!1spt-BR!2sbr"
      width={width}
      height={height}
      style={{ border: 0, borderRadius: '32px', boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)' }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};
