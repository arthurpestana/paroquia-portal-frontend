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
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.0228768090715!2d-48.3179763!3d-10.178795699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9324cc9e31431eef%3A0xc16bbff60feb6716!2sPar%C3%B3quia%20Nossa%20Senhora%20do%20Monte%20do%20Carmo!5e0!3m2!1spt-BR!2sbr!4v1749519985653!5m2!1spt-BR!2sbr"
      width={width}
      height={height}
      style={{ border: 0, borderRadius: '16px', boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)' }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};
