import { Icon, IconProps } from '@chakra-ui/react';
import { SVGProps } from 'react';
import { JSX } from 'react/jsx-runtime';

export const HelathyFoodIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 24 24' {...props}>
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M12.5008 5.5623C12.5008 6.00302 12.5008 6.44374 12.5008 6.89781C12.7694 6.88232 12.7694 6.88232 13.0434 6.86651C14.6999 6.87529 16.1845 7.41893 17.509 8.40026C17.6217 8.51841 17.7345 8.63655 17.8507 8.75827C18.3096 9.19425 18.7295 9.18759 19.3453 9.23496C19.5331 9.86098 19.5331 9.86098 19.3453 10.2366C14.4974 10.2366 9.64949 10.2366 4.65468 10.2366C4.48775 9.56884 4.48775 9.56884 4.65468 9.23496C4.8234 9.22463 4.99211 9.2143 5.16593 9.20366C5.76302 9.13799 6.03661 8.92337 6.47014 8.51503C7.68223 7.37535 9.27366 6.88276 10.9253 6.87695C11.1147 6.88383 11.3041 6.89072 11.4992 6.89781C11.4992 6.4571 11.4992 6.01638 11.4992 5.5623C11.915 5.35439 12.0686 5.43263 12.5008 5.5623ZM7.65958 9.23496C10.5243 9.23496 13.3889 9.23496 16.3404 9.23496C15.162 8.05655 13.5857 7.99467 12 7.98292C10.4143 7.99467 8.83799 8.05655 7.65958 9.23496Z'
                fill='black'
            />
            <path
                d='M5.99019 10.9043C6.32073 10.9043 6.65127 10.9043 6.99182 10.9043C6.99426 11.0466 6.99669 11.1889 6.9992 11.3355C7.00942 11.866 7.02181 12.3964 7.03564 12.9269C7.04117 13.156 7.04585 13.3851 7.04966 13.6142C7.05529 13.9445 7.06428 14.2748 7.07334 14.605C7.07771 14.8035 7.08208 15.0019 7.08658 15.2064C7.16507 15.7927 7.29872 16.1148 7.65958 16.5803C8.12898 16.7367 8.42269 16.7699 8.90893 16.7741C9.13545 16.7765 9.13545 16.7765 9.36654 16.779C9.61069 16.78 9.61069 16.78 9.85978 16.7811C10.0275 16.7821 10.1953 16.783 10.3681 16.784C10.7232 16.7856 11.0782 16.7867 11.4332 16.7873C11.9758 16.7889 12.5184 16.7941 13.061 16.7994C13.4059 16.8005 13.7509 16.8013 14.0959 16.802C14.2579 16.804 14.42 16.8061 14.587 16.8082C15.7164 16.809 15.7164 16.809 16.6743 16.2464C16.8616 15.6846 16.8759 15.2296 16.894 14.6376C16.901 14.4208 16.908 14.204 16.9152 13.9806C16.9219 13.7517 16.9285 13.5227 16.9351 13.2937C16.9423 13.0627 16.9496 12.8317 16.957 12.6008C16.9747 12.0353 16.9917 11.4698 17.0082 10.9043C17.3387 10.9043 17.6692 10.9043 18.0098 10.9043C18.0098 11.1247 18.0098 11.3451 18.0098 11.5721C18.4505 11.5721 18.8912 11.5721 19.3453 11.5721C19.5331 12.1981 19.5331 12.1981 19.3453 12.5737C18.9046 12.5737 18.4639 12.5737 18.0098 12.5737C18.015 12.7479 18.015 12.7479 18.0204 12.9256C18.0343 13.4552 18.043 13.9847 18.0515 14.5144C18.0571 14.6971 18.0627 14.8798 18.0685 15.068C18.0812 16.1205 18.0841 16.8009 17.342 17.5819C16.8064 17.9186 16.3834 17.9593 15.7562 17.9643C15.5723 17.9664 15.3884 17.9685 15.199 17.9707C15.0011 17.9711 14.8032 17.9715 14.5993 17.9719C14.3951 17.973 14.1909 17.9741 13.9805 17.9752C13.5486 17.9769 13.1167 17.9777 12.6848 17.9776C12.0245 17.9784 11.3645 17.9844 10.7043 17.9908C10.2845 17.9917 9.86478 17.9924 9.44504 17.9927C9.24782 17.9951 9.05059 17.9975 8.84739 18C7.79851 17.9942 7.10173 17.9889 6.32407 17.248C5.94868 16.7253 5.95085 16.2717 5.95758 15.6386C5.95866 15.46 5.95974 15.2814 5.96084 15.0974C5.96364 14.9119 5.96644 14.7264 5.96932 14.5353C5.97083 14.3472 5.97234 14.1591 5.97389 13.9653C5.97782 13.5014 5.98331 13.0376 5.99019 12.5737C5.54947 12.5737 5.10875 12.5737 4.65468 12.5737C4.46687 11.9477 4.46687 11.9477 4.65468 11.5721C5.0954 11.5721 5.53612 11.5721 5.99019 11.5721C5.99019 11.3517 5.99019 11.1314 5.99019 10.9043Z'
                fill='black'
            />
            <path d='M12 11.2382V15.2448' stroke='black' strokeWidth='1.2' />
            <path d='M9.99673 13.2415H14.0033' stroke='black' strokeWidth='1.2' />
        </svg>
    </Icon>
);

export const NationalFoodIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 24 24' {...props}>
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
        >
            <rect width='24' height='24' fill='url(#pattern0_86_4949)' />
            <defs>
                <pattern
                    id='pattern0_86_4949'
                    patternContentUnits='objectBoundingBox'
                    width='1'
                    height='1'
                >
                    <use
                        xlinkHref='#image0_86_4949'
                        transform='translate(0.166667 0.166667) scale(0.00694444)'
                    />
                </pattern>
                <image
                    id='image0_86_4949'
                    width='96'
                    height='96'
                    preserveAspectRatio='none'
                    xlinkHref='data:image/png;base64,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'
                />
            </defs>
        </svg>
    </Icon>
);

export const ChildFoodIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 24 24' {...props}>
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
        >
            <rect width='24' height='24' fill='url(#pattern0_86_4946)' />
            <defs>
                <pattern
                    id='pattern0_86_4946'
                    patternContentUnits='objectBoundingBox'
                    width='1'
                    height='1'
                >
                    <use
                        xlinkHref='#image0_86_4946'
                        transform='translate(0.125 0.125) scale(0.0078125)'
                    />
                </pattern>
                <image
                    id='image0_86_4946'
                    width='96'
                    height='96'
                    preserveAspectRatio='none'
                    xlinkHref='data:image/png;base64,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'
                />
            </defs>
        </svg>
    </Icon>
);

export const VeganFoodIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 24 24' {...props}>
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
        >
            <rect width='24' height='24' fill='url(#pattern0_6018_118064)' />
            <defs>
                <pattern
                    id='pattern0_6018_118064'
                    patternContentUnits='objectBoundingBox'
                    width='1'
                    height='1'
                >
                    <use
                        xlinkHref='#image0_6018_118064'
                        transform='translate(0.125 0.125) scale(0.0078125)'
                    />
                </pattern>
                <image
                    id='image0_6018_118064'
                    width='96'
                    height='96'
                    preserveAspectRatio='none'
                    xlinkHref='data:image/png;base64,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'
                />
            </defs>
        </svg>
    </Icon>
);

export const SnacksFoodIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 24 24' {...props}>
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
        >
            <rect width='24' height='24' fill='url(#pattern0_86_4952)' />
            <defs>
                <pattern
                    id='pattern0_86_4952'
                    patternContentUnits='objectBoundingBox'
                    width='1'
                    height='1'
                >
                    <use
                        xlinkHref='#image0_86_4952'
                        transform='translate(0.125 0.125) scale(0.0078125)'
                    />
                </pattern>
                <image
                    id='image0_86_4952'
                    width='96'
                    height='96'
                    preserveAspectRatio='none'
                    xlinkHref='data:image/png;base64,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'
                />
            </defs>
        </svg>
    </Icon>
);

export const SecondFoodIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 24 24' {...props}>
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
        >
            <rect width='24' height='24' fill='url(#pattern0_84_4911)' />
            <defs>
                <pattern
                    id='pattern0_84_4911'
                    patternContentUnits='objectBoundingBox'
                    width='1'
                    height='1'
                >
                    <use
                        xlinkHref='#image0_84_4911'
                        transform='translate(0.153895 0.125) scale(0.0078125)'
                    />
                </pattern>
                <image
                    id='image0_84_4911'
                    width='96'
                    height='96'
                    preserveAspectRatio='none'
                    xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7klEQVR4nO3aPa9MURSH8cdLaBSIaIWKQkOjuqFQUOjFTSQKnUIkEoX4BkSLRqIUiU/gpaUVEoVvQMKNCGHLSeaWe27BnLXWOc8vWd1ksvf6zz5rzpwBSZIkSZIkSZIkSZI0aa1TMoB5aJ4AA5i15gkwgFl/otuKXz87BhDMAIIZQDADCGYAwQwgmAEEM4BgBhDMAIIZQDADCGYAwQwgmAEEM4BgBhDMAIIZQDADCFYlgN3AryXv9z9rVFUCODlS8w2g48pUA6jivgHEemkAcbYBnw0gzqFO838AOwPXNRsXOgG8iV7YXNzuBPCIBO6OeG1syeoaCVxK0IgWVGskcDRBI1pA/QH2ksB24GuChrSR6xOJvE7QkDZyPSORewka0kauOySy3lnkK+p739nbWRI51lnkt8WMqGoP8LuztwMksmwQD9+SqlqrMIC3GsTDfUJV1zt7ekpCvUE83ClX9aSzp1skNMVB/KHCAN5qEA+zYRf17KsygDftWDKIL1PPzUoDeNPzzqI3gKvAfvI7CNwAfnb28oDELia4Q20rrjMkNlyG3iVoUltRDQ/m0zuxeFbaJlZfgMMUcQ74PrHmn6KY48DbBM1r/1gvgCMU/j/NeeAx8LHIqdhY/AL6EDgd3UBJkiRJkiRJkiSJ2fgLtf6eqlr3ZxsAAAAASUVORK5CYII='
                />
            </defs>
        </svg>
    </Icon>
);

export const GrillFoodIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 24 24' {...props}>
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
        >
            <rect width='24' height='24' fill='url(#pattern0_84_4908)' />
            <defs>
                <pattern
                    id='pattern0_84_4908'
                    patternContentUnits='objectBoundingBox'
                    width='1'
                    height='1'
                >
                    <use
                        xlinkHref='#image0_84_4908'
                        transform='translate(0.125 0.125) scale(0.0078125)'
                    />
                </pattern>
                <image
                    id='image0_84_4908'
                    width='96'
                    height='96'
                    preserveAspectRatio='none'
                    xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADzUlEQVR4nO2dTU8UQRCGX5RgDIv6A+QkiB+JICc9+pdQSFTurJEInNSLNwUMiQejgtz8DcaPs65iokaEhHjQNpPUJmQy3Tuw3ds1Pe+T1AWKUFVvb3XP7HQPQAghhBBCCCGEED+cBTADYBPAewC7AExFbFdizmKfBjBapUFxEcBzBUU0ni0TYxKK6QewBOCvgmKZQJbltiC5quKUjBBTE9sAcBJKOArgpYKimB7bay2fhCUFxTCR7F7s4k926PlfAdwEMA5gENVhUGK+BWDLkV+W+0TMQF19/0nFim6jAWDZkec6Iq7zbUE9BtCHdOjrIMJIjKBmHG0nGzWp0XC0oxua2k/W81PltmNZ2nM+WoK5hHQZt+T8IUYwvy3B2NrPAIA7AL4AaAFoys8O6+eDYQBrkktmzwCMOfyHLDlnf9tzbBOSjWaBb7MLPx/F/1Hwv37K73zlHYyDBtIq8G114dcta44cnjr+jgIEbqGZbacoQFFrmevCL6QAv1IUYECK2yoxCTdL+HXLM0cOqykKoI0xmXDz8X8HcLoKeasJpAuGZcLdFlvtUHxVeasJpK55qwmkrnmrCaSueasJpK55H2YZ2r7HY5Raq8Syt7ICFF1gGaXWTFEAzSPfFHyp5CvvYBw0EFMxs0EBQAEONRJij2jDT4CS3pmj9i0oNhQgMhQgMhQgxzEAd+W+fLZT5T6A4wH9KECOhwVFeRDQjwLs4yqAfyWeu/HpRwH28abkl+Q+/SiAcL7kRgjffhRAmLIU41Nu0vTtRwE6PKmWvzXs248CCG8txbjWdgjkRwGEogdlMzvTdgjkRwGEP5Zi5PeZ+fajAB0Klt9v4NuPAnRoGfkNcL79KIDASfiA+B45a1yGxhVgquSFEy/EAglwzuGzGNCPc0CJm2c7uZ33Pv0owD6uWG4f7wE4EsiPApT4AuVRQD8KUPAV4qK0iT0pViOgHwWw0FfyxJVu/ShAZChAZChAZGovgFFqvgQLhq/AjVLzlXcwKACqJUDRMTRGqX32mHcwUt6kN+cxb1VHlrVPQTEV3aY6pOnIsjoe2jdhyTl714CaYyuz435TZVbTsZXTlmC2Ej24dQjAN0vO12MENOropcsJHl284sg3/7BXz9joIEIjkZG/4sjzVexJyXV8/ZYc93u5YmI0JOZZR9sxknv0RceCguWjiWTzUPIKkxcKimHq+goTyAttXPNBarYO4ASU0S9bf1J/jdW8fOrVckGOgjSJ2Wbs98UclBF5s0TWmt7JUwmmIrYjMW/IRVa0dT4hhBBCCCGEEIKk+A84sduiCdYsdwAAAABJRU5ErkJggg=='
                />
            </defs>
        </svg>
    </Icon>
);

export const SouseFoodIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 24 24' {...props}>
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
        >
            <rect width='24' height='24' fill='url(#pattern0_84_4907)' />
            <defs>
                <pattern
                    id='pattern0_84_4907'
                    patternContentUnits='objectBoundingBox'
                    width='1'
                    height='1'
                >
                    <use
                        xlinkHref='#image0_84_4907'
                        transform='translate(0.166667 0.208333) scale(0.00694444)'
                    />
                </pattern>
                <image
                    id='image0_84_4907'
                    width='96'
                    height='96'
                    preserveAspectRatio='none'
                    xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFcElEQVR4nO2dW2icRRTH/+sladSisdGYphZbq74UilXUB8UqiiholUYtEqzQgu274IsahVZ88EXbgoo3FG3VJykqPnmnlVgvoV5aaxJp64Maq9KaptpdOXA+2Cw5M/N930x2d+b84Dxk2bnknPnOnDnfzCygKIqiKIqiKEqTuAbACwC+BPATgK8APA1gabM6lApnAXgTQE2QKhvi1GZ3NEZOA/CZQfn18i6AOc3ucGy85Kj8TN5TI/jjjpzKVyN4hPz5aEEDkLyvT0I57jQo9zUAC9jn65wQCCnq+RHA6fydTgDvqBHCcFBQLD0Z9agRAjCHY/tG5f9bN/rrUSN4plsY/X8ayqgRPELKPCGseLst5XRO8MS48BQMWMqpETzximCANxzKqhE8MCAY4C8Ap3g0An1PEZJwRwTFXQI3Oh0Xa2oEgW8FpV0Bd9QIBbkSwHHBABfmrMvFCNsBVIp2Nkb/f1RQ1O8ATipQp4sR7kPiVAA8LKyCM9lcon6bESjPlCxdALZZRiithOeXbMdmBNcJPir6AHxuUT7lgVZ6ao+M8LXQzi1IjOUADliUT+Ho7R7bpITeN2oAGCfbTMg4l+ZU8MnsSi4DcBH/nX1+myG8JbkYCVBxmGxJdrF7cuUCAM/xXFFfD4WzhwBMWdrbiwTocphsSV7P+U53EMA/DvWa5F5ETp/DZEtPxUM5F0WrHZ4mm2yLfSG23HGyXZWz3vmcoCuj/JcBdCBiBgJNtmCfX1Tx9N75HkRMJdBkWz/pSvmiSQBfAPit4fPDnKZeE3sWtIsnUt+Trcvop2hnWd33zgSwCMDZSIQ+x8n2iRIT30JDWPksEmYZgJ8typ/04Hul0X+cR3uSrDK8xcqEFkSXl2xHR38D5EYeFLaS1AudbDkf5Wm50d8D4DH+B20jUAXT1h27WXfziip/5Qy5DxXk1sFhTtTlVr7tsVeBsw5Il7fmcTs68uF9gP3h6o7Ib+noRhAdDLkYgM7IqgEQRAc0MVv5WyhM+2kUN64SdEjZVSvSMjzqtKpnOgUdHnMpPCEUTibh5IEeQYeUQbUyJhRONg9SgMWCDul4rJXdQuEVRXqSKNcJOhx2KbxdKHx/+H5Hw3rDOworjwbYO5kam8usA+4WCo+E73c0jAg6vMt1N4D0pqk3fN/bnnMN76r7XSv5QahgXdi+R8FaQXff56lkq1DJx+H6HQ0fCLrbkqeSFQY3lMQm0xLx/wkfYXyFL6+bqaLni/YuAZ4RdDZe5PiTlJae4pfXynT6Odczk842ogC9hl3BtFhTpvOqoKtjeaKfRrYIlZLcXLTSCLnaEHpSQFOYhYbHasxyw0gqzAWwz+CuaZ9pKUyvKHfEvve9hOsh2QRPm2H3Gxp5BOnygEEvY3wvhRdutGxTSTFTOmjw+9UQx1IfNxjgv8SMMGg4P0DyZIhG6S6dTwyNZu6okoDbqRp0sDPkZd89hkRdJm9H+v54rsPBkNGCJ3JyQe+Gf7F0hJbeNyEerjWEmpn8yoe3Z4WlDkYgectHHNxE+jnMrDoon05rziqL+AS4zQg0Wb3YZreFLObEmrQIbXQ7szbyGzkHwEcOncxCs085WjoPrfkmay2AD3PsDN85Gz7fJTraVGA7+x7ONW0AcD2AJbx7OOQOvA5uYwm3uZ5/omQk54n4KoeaLfXTJjfwzVC1yGW8le/+6eAzXZMtoKiaZ6G57CkAZ6AN6OWzurZrBGptIFN82y65rbajl7OpZX4ypNZEV7PRw11yLUGFfyyNdox91wLKrRm2jmzlhVeRKyzbhj7eJTbEy/th3gQw4XD7VFl3MsFtDXPbQ9yXKEa6oiiKoiiKoiiKoiiKoigKWpL/Acm58JO7a11PAAAAAElFTkSuQmCC'
                />
            </defs>
        </svg>
    </Icon>
);

export const DrinksFoodIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 24 24' {...props}>
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
        >
            <rect width='24' height='24' fill='url(#pattern0_84_4903)' />
            <defs>
                <pattern
                    id='pattern0_84_4903'
                    patternContentUnits='objectBoundingBox'
                    width='1'
                    height='1'
                >
                    <use
                        xlinkHref='#image0_84_4903'
                        transform='translate(0.125 0.144216) scale(0.0078125)'
                    />
                </pattern>
                <image
                    id='image0_84_4903'
                    width='96'
                    height='96'
                    preserveAspectRatio='none'
                    xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFDklEQVR4nO2deaxdQxjAf31P2yh9/lLkUVpRvCKWILZHqyFiaawJ6V+iiOQJaSyNiJZWiIQIsYTSVPjDUmKPPcQSRaoillIkVKsLSlXx3sgk85Kmud+c23vPnZkz5/sl33/nnG+ZuXNmvvnmXFAURVEURVEURVEURVEURVGK2QmYDXwI/A6YmshvzudrgZ5YHWUqsDqBYJjIsgo4IXTwjwc2J+C8SURsLPpDBX8HYGUCTpvE5EdgTIgGuDwBZ02iMhCiAV5LwFGTqLwaogG+F5SfQn04VYiBjU3HWSUo35X6sIsQg19CKF8uKJ9EfdhXiME3IZQvEZQfTn04QojBJzFfwtOoDycJMXgzhPKnBOXnUB/OFWLwbAjlDwnKL6Q+zBRisCCE8tsF5bOoD1cJMbg5hPLZgvI7qA93CjGwWYKOM0NQ/iT14emY78HjBOV2eloXPhZi8B7wHfAX8AfwBfAIcDYwsizlewrK7d5AXVjTQp7oK+D0MpRvB/zXQMEQsD35M6aF4G8Zo/nAiHaN+EFQsB/509dGAwzLvHaNeKvGi7HzSmiAoXaHo7uFB88lf+aV0ADD74SWX8yXCA9dTP484wmqnQlOdoEdC5wBfO65/qxWjTg6Zjo2MisE3+3EZP8G1/d4GmFRq0b0uHFs6wcOAjuSL2MFv60s9Nw3XbjHrhNK7wm2XihXpnmGk8MKOmyjeza0Y8zjwkNvIF/mCj5/VHCf1ACb2jFmIGZlQCRebzEJN1m476d2jDlYeOifZeY9EsL6tFHw2S7OfFzZic7aBfwqPPhI8uMowdefC1IL3cBnnVoRPy88eA75cZPg62Mt9v5SChlmxawOCMyngq8Xee6ZAvzdyRhNEh5u58p7kA97eXrxRE8Fue/MxGllGfeloOAy8mFA8HGZcP2lBeX7dketNG6LWSMTiLebXPP0et6Lw7IOGF+mcf2eYWgCeQw/Q4KPB2yxSXNNE8e07MLr2LIN7HaHExopvJ7qM8eTTrYr3KvdVNQUyD/tZD+LuEVQuryM7beIWNu/FXxb4VkHNRp2psbapqtyzejJTQbYJ3b6uk/MqukXqC4vtxH4f93IMDqUsRd7Xsa2nr5q9HlevkXyEnBQaIPtTGCtYND9VI8HWwj8O8CJMY2eLxi2uWJT0olu1tJs4J9z27TR6fUY/jDVYWGTgV/iTsskxQOeTeuivHkK9AmVf1vLiyFfsNvCeE8G8I3E1wUjXAqlKPiD7teeLHd5jL+AdJnR5NBjF2BJs5vb8W9k/MqYn3gp+PROMykF43I+lT3GY9wvJDXu2YZZj52iJs8oz15B28WpJTPds+ha5g7fbXIzvEXuizGVYIrHsbXA7rENdDt36wQbbcAPddeNdpnfyiFVUhvg3ciHOqzu9z323UgG2J/r1x4nF0fqWd0Flc5L3TCaBQe6gi3J2UcDF3ONdOUkkj0bYyTTOs2ZbWQXTWA5n0y5NYHgmgKxNmbLzp76SpOA2PO948iUUZ7qYpOQfBDq64ehuTeB4Jom5T4y45AmU7wmERlMMc/fqc3tJyKldnudbsmuV8iECa5HScHvimhbl+eolZ0y700GXCc4uMF9/jE24zyp8xwq+8SZzwLS30bNosC4yp+4X0MGSF/aNRWQ1Tl/3stUQGy2tPIc45kFmYRl0NmeBVdUKBNqnK32dGNW9LtK6fUJBNgIst7ZGOzvSBRFURRFURRFURRFURRqw/8WXTgttYNCMgAAAABJRU5ErkJggg=='
                />
            </defs>
        </svg>
    </Icon>
);

export const DesertsFoodIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 24 24' {...props}>
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
        >
            <rect width='24' height='24' fill='url(#pattern0_84_4902)' />
            <defs>
                <pattern
                    id='pattern0_84_4902'
                    patternContentUnits='objectBoundingBox'
                    width='1'
                    height='1'
                >
                    <use
                        xlinkHref='#image0_84_4902'
                        transform='translate(0.125 0.125) scale(0.0078125)'
                    />
                </pattern>
                <image
                    id='image0_84_4902'
                    width='96'
                    height='96'
                    preserveAspectRatio='none'
                    xlinkHref='data:image/png;base64,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'
                />
            </defs>
        </svg>
    </Icon>
);

export const PrepFoodIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 24 24' {...props}>
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
        >
            <rect width='24' height='24' fill='url(#pattern0_86_4962)' />
            <defs>
                <pattern
                    id='pattern0_86_4962'
                    patternContentUnits='objectBoundingBox'
                    width='1'
                    height='1'
                >
                    <use
                        xlinkHref='#image0_86_4962'
                        transform='translate(0.151406 0.146862) scale(0.0078125)'
                    />
                </pattern>
                <image
                    id='image0_86_4962'
                    width='96'
                    height='96'
                    preserveAspectRatio='none'
                    xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEm0lEQVR4nO2cS4gdRRSGvzwnOJNkBockRN1kkcdiVmpQhGRW4gPcRd2okyBmNyaaoGSRZBEUNCsVQRARXxsziSJIIC7cRDcSSMjDR2QU4wMlD40ZhVFLCipwGW7V7b79Oqe6Pjibvl19//+cvt11q6saEolEIpFIJBKJRKIcbgEOAmeBGcAojRngDPAicLOWk2Mb8JeA5JkKijGBcCYEJMpUHI8jlJuUX25Mjl+CvcSK46CA5Jia4gUEclZAYkxNcRqB+C4/twbaGE/0oq52t3n2v4ZA+kmKEV6AIt9VO6kADZMK0DCpAA2TCtAwam5WsfpSIzRWX2qExupLjdBYfakRGquvPz1C7d95rdzu8WS9iuN04GyJLU4hkOcFJMbUFAcQyCrgioDkmIrjd2A1QnkY+FdAkkxFYb09iGAWAl8JSJSpKL50HsWyR0CSTMXxLEJZClwOCD8EbAYGkcug03g44OMSMIRAngiI3ok+ntY2NWXKI9Zu18oRj6f3Eci0R+wm9LLZ4+lbBHLNI1bk9TIjQ7HPitCAGl9qhMbqS43QWH1JEboIGANWdvnMblsHzFPoS4XQTcCPHeM2rwDzgWWu63hd00lgjSJfKoQuAX7t8v1vAJ932X5cia/MNC30zoAGXwwr8JWZpoWuzZl825cfUOArMxKETuUogH2Cp8WXGqGLgaMZkv8usECRLxFCh4Gt7qZ6zMXbwI6OHs0K4IcMBfgkx4OV1hdgHrCrx/Pm/4CPgC9yXIKeSwXozcI5/fcy4zuy0epfwEsVJd/GNw36qoSyhU6UlGj7h+vNLtufachXZZQpdEVJc4wOub6+HR/aB3ztltPudkMUdfuqlDKFvhY4nh1WuA/YCEwC3wf2fU+Yr0opS+g64J/Ao8Dlc/YfcV3SbvvPAqNCfFVOWUJfDRzrbk+b0Y5R0LnxiBBflVOG0JHANPePe7Td72ln32FRhFYVYEfgOHaufogHPO3eoRitKsCJwNBBLyY9bd+iGK0pwFjgGPdkuHFf8LTd37Cv2igq9ICn/XSgzz7o+ve+OUllTAxrTQHOedrv9STe3i9+Cnyvccec37Cv2igidEOg/fqO/Va7S8pvPRJ/fYT03oZ91UoRoZOetufdtPct7mnXbIbEh345dfuqlSJCP/S0teNBf+dIunH7lzl9vBUF+DlnkkPLR+8Q5KtW+hV6YwmJ/wXYnuM5bx2+aqdfoesLLpp7ErhBoK/a6VfoypxJ/wN4HbiLeoi+APRYFGfcKzFtL+ihBhb5taIAQ27QbLYj4XaGw8vA/Q2vrGxFATonVo1UdDPtl1YVQCJqfKkRGqsvNUJj9aVGaKy+1AiN1dfVCBdqLwu8tEkcvvcE2eX+WhkPDIGIw/dv1m7XygeBKY/ieCxwvbSvftHG7oCfopO9KmHYvczIJ/qI+0lLf2HTeODMt3Gxy/RIFWdNLLETwQx4FkXHEsfdeJVoVgVe3qQ5pj3vnxCJna38qYCkmZLiM3diqWKx6/1cFJBA02dY7U9puOyEsD2GR90TrXOBf8xGQFx1S5imXFdTbG8nkUgkEolEIpFIoJb/AVxf/H3EuTZKAAAAAElFTkSuQmCC'
                />
            </defs>
        </svg>
    </Icon>
);

export const SaladsFoodIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 24 24' {...props}>
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
        >
            <rect width='24' height='24' fill='url(#pattern0_6018_5649)' />
            <defs>
                <pattern
                    id='pattern0_6018_5649'
                    patternContentUnits='objectBoundingBox'
                    width='1'
                    height='1'
                >
                    <use
                        xlinkHref='#image0_6018_5649'
                        transform='translate(0.161085 0.153364) scale(0.00751704)'
                    />
                </pattern>
                <image
                    id='image0_6018_5649'
                    width='96'
                    height='96'
                    preserveAspectRatio='none'
                    xlinkHref='data:image/png;base64,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'
                />
            </defs>
        </svg>
    </Icon>
);

export const FirstFoodIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 24 24' {...props}>
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
        >
            <rect width='24' height='24' fill='url(#pattern0_86_4920)' />
            <defs>
                <pattern
                    id='pattern0_86_4920'
                    patternContentUnits='objectBoundingBox'
                    width='1'
                    height='1'
                >
                    <use
                        xlinkHref='#image0_86_4920'
                        transform='translate(0.166667 0.166667) scale(0.00694444)'
                    />
                </pattern>
                <image
                    id='image0_86_4920'
                    width='96'
                    height='96'
                    preserveAspectRatio='none'
                    xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADhUlEQVR4nO2cy28OYRSHn6pbaZWN0A1BLQRhI00TBFvWjcsf4bqhexa0LhUkiK6UhWuEsiHp30AICbuicWtokPaVN86Kznzz9evMO9/M70lO0vQyc875zZz3zPtNDwghhBBCCCGEEFUwo5pfFtNHE9AHfDE7Z98TGXEacP9Yj7KfHcOTCPBeAmSHizAhAcqB0x0gAUqN0x2QLouBDmAP0A30Av3AfWAoRoAh+51++5tuO0aHHVNMwmpgnyXsGfA1JsG1mj/2U3tm8OdsL6MiC4Au4DLwLsVkJ7W35ov3qYWCMhfYDdwGxnKQdBdh3rdbJsYcCsBy4ATwMQfJdVXaB+A4sIw6xDt9Cfidg0S6Gm0cuFkv68VC25n8VUPAE8Ab4I4tzAetk9kMrAVWAEuARcAsYLZ93WY/WwdsAfYCh+0Yd+2YEzX45WM6YzHmkq6ITbJK9tkStB/YBMxP0cdma0kPAPfs3NX6O2yx5oYW67ur7TxOAZ1AY0DfG82Hnil0ZNfy0DX52/11FbfwDSsPDeSPBmCr+Zi0hL62shiEHfZpVCUnf1gd9jW6XmizD32StMy+jG3P2sFdwM8Ei+kVYCn1SxtwNcHi7XOxMyuntiW4Ml5ZbS0KnRZTXMxjVsJSf7AaqeDIY6CV4tEKPKkQ+4jlqCbmAecT1ncZiVvtvqRvblxUYknrwvK5rfiik+9adGWTSg6+V3qZTAIQVgCVIFIV4EKSNaDJNtSmsk8iY9IcfALO6vVJIYQQtRK10JYNFyoPEuAvEiAwEqCoAkx1N7RsuLzthpYNl7fd0LLh8rYbWjZcGgJ4VILSEyDV3dCy4ULthkqAwHmQAH+RAIGRAIGRAIGRAIGRAIGRAIGRAIGRAIGRAIGRAIGRAIGRAIGRAIGRAIGRAIGRAIGRAGUV4FvEif0kkjKNXXMRM+lS52XEyddTHjZE5OBFFieP+m/xo5SH7ogcDGZx8iMxg4zKUIZabFL7ZDk4lIUD7TEL0PWczgKaLnxsAzHxryQjBiuI0FzQK38gJu6HWS9C4zHO+HJ0DNhY52I0WwzdMWXHWS4yb0J6q3w9r8h2kkAD7x7kIHgX2Px8pJkEHGIUtx4U3R7ZQ1lQZtrYx7g1oWg2bmUn5MjN/1hjI35dwe2JNSG5ZZWNDPal6TkwmoOkuSnaqMUwaA9ZmfX5QgghhBBCCCGEEILC8QcO4lKLjoWFSAAAAABJRU5ErkJggg=='
                />
            </defs>
        </svg>
    </Icon>
);

export const BookmarkIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 12 12' {...props}>
        <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M5.99997 3.30749C7.04022 2.23874 9.64047 4.10999 5.99997 6.51524C2.35947 4.10999 4.95972 2.23949 5.99997 3.30899V3.30749Z'
                fill='currentColor'
            />
            <path
                d='M1.5 1.5C1.5 1.10218 1.65804 0.720644 1.93934 0.43934C2.22064 0.158035 2.60218 0 3 0L9 0C9.39782 0 9.77936 0.158035 10.0607 0.43934C10.342 0.720644 10.5 1.10218 10.5 1.5V11.625C10.5 11.6928 10.4815 11.7594 10.4467 11.8176C10.4118 11.8758 10.3618 11.9234 10.302 11.9554C10.2422 11.9874 10.1748 12.0026 10.1071 11.9994C10.0393 11.9961 9.97372 11.9746 9.91725 11.937L6 9.82575L2.08275 11.937C2.02628 11.9746 1.96067 11.9961 1.89292 11.9994C1.82516 12.0026 1.7578 11.9874 1.698 11.9554C1.6382 11.9234 1.5882 11.8758 1.55334 11.8176C1.51847 11.7594 1.50004 11.6928 1.5 11.625V1.5ZM3 0.75C2.80109 0.75 2.61032 0.829018 2.46967 0.96967C2.32902 1.11032 2.25 1.30109 2.25 1.5V10.9245L5.79225 9.063C5.8538 9.02204 5.92607 9.00019 6 9.00019C6.07393 9.00019 6.1462 9.02204 6.20775 9.063L9.75 10.9245V1.5C9.75 1.30109 9.67098 1.11032 9.53033 0.96967C9.38968 0.829018 9.19891 0.75 9 0.75H3Z'
                fill='currentColor'
            />
        </svg>
    </Icon>
);

export const PeopleIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 12 12' {...props}>
        <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M5.25 10.5C5.25 10.5 4.5 10.5 4.5 9.75C4.5 9 5.25 6.75 8.25 6.75C11.25 6.75 12 9 12 9.75C12 10.5 11.25 10.5 11.25 10.5H5.25ZM8.25 6C8.84674 6 9.41903 5.76295 9.84099 5.34099C10.2629 4.91903 10.5 4.34674 10.5 3.75C10.5 3.15326 10.2629 2.58097 9.84099 2.15901C9.41903 1.73705 8.84674 1.5 8.25 1.5C7.65326 1.5 7.08097 1.73705 6.65901 2.15901C6.23705 2.58097 6 3.15326 6 3.75C6 4.34674 6.23705 4.91903 6.65901 5.34099C7.08097 5.76295 7.65326 6 8.25 6V6Z'
                fill='black'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3.912 10.5C3.80082 10.2658 3.74537 10.0091 3.75 9.74995C3.75 8.7337 4.26 7.68745 5.202 6.95995C4.73182 6.81508 4.24196 6.74423 3.75 6.74995C0.75 6.74995 0 8.99995 0 9.74995C0 10.5 0.75 10.5 0.75 10.5H3.912Z'
                fill='black'
            />
            <path
                d='M3.375 6C3.87228 6 4.34919 5.80246 4.70083 5.45083C5.05246 5.09919 5.25 4.62228 5.25 4.125C5.25 3.62772 5.05246 3.15081 4.70083 2.79917C4.34919 2.44754 3.87228 2.25 3.375 2.25C2.87772 2.25 2.40081 2.44754 2.04917 2.79917C1.69754 3.15081 1.5 3.62772 1.5 4.125C1.5 4.62228 1.69754 5.09919 2.04917 5.45083C2.40081 5.80246 2.87772 6 3.375 6V6Z'
                fill='black'
            />
        </svg>
    </Icon>
);

export const HappyFaceIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 12 12' {...props}>
        <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M6 11.25C4.60761 11.25 3.27226 10.6969 2.28769 9.71231C1.30312 8.72774 0.75 7.39239 0.75 6C0.75 4.60761 1.30312 3.27226 2.28769 2.28769C3.27226 1.30312 4.60761 0.75 6 0.75C7.39239 0.75 8.72774 1.30312 9.71231 2.28769C10.6969 3.27226 11.25 4.60761 11.25 6C11.25 7.39239 10.6969 8.72774 9.71231 9.71231C8.72774 10.6969 7.39239 11.25 6 11.25ZM6 12C7.5913 12 9.11742 11.3679 10.2426 10.2426C11.3679 9.11742 12 7.5913 12 6C12 4.4087 11.3679 2.88258 10.2426 1.75736C9.11742 0.632141 7.5913 0 6 0C4.4087 0 2.88258 0.632141 1.75736 1.75736C0.632141 2.88258 0 4.4087 0 6C0 7.5913 0.632141 9.11742 1.75736 10.2426C2.88258 11.3679 4.4087 12 6 12V12Z'
                fill='currentColor'
            />
            <path
                d='M8.48629 7.51048C8.55748 7.49371 8.63202 7.49814 8.70073 7.5232C8.76945 7.54827 8.82933 7.59288 8.87301 7.65154C8.91669 7.71021 8.94226 7.78037 8.94657 7.85338C8.95089 7.92639 8.93375 7.99908 8.89729 8.06248C8.60113 8.57574 8.175 9.00194 7.66178 9.29818C7.14856 9.59442 6.56636 9.75024 5.97379 9.74998C5.38121 9.75024 4.79901 9.59442 4.28579 9.29818C3.77258 9.00194 3.34644 8.57574 3.05029 8.06248C3.01382 7.99908 2.99668 7.92639 3.001 7.85338C3.00531 7.78037 3.03088 7.71021 3.07456 7.65154C3.11824 7.59288 3.17812 7.54827 3.24684 7.5232C3.31555 7.49814 3.39009 7.49371 3.46129 7.51048H3.46504L3.47779 7.51423L3.52804 7.52548L3.71704 7.56673C3.87829 7.60123 4.10329 7.64773 4.35979 7.69348C4.87954 7.78648 5.50129 7.87498 5.97379 7.87498C6.44629 7.87498 7.06879 7.78648 7.58779 7.69348C7.8662 7.64338 8.14351 7.58737 8.41954 7.52548L8.46979 7.51423L8.48254 7.51123L8.48629 7.50973V7.51048ZM3.56704 3.42448C4.13929 2.35648 6.58204 3.33448 4.28104 5.99998C0.909036 4.80298 2.51854 2.77648 3.56704 3.42448ZM8.43304 3.42448C9.48154 2.77648 11.091 4.80298 7.71904 5.99998C5.41879 3.33448 7.86154 2.35648 8.43304 3.42448Z'
                fill='currentColor'
            />
        </svg>
    </Icon>
);

export const ArrowRightIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 16 16' {...props}>
        <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M1 8.00001C1 7.8674 1.05268 7.74022 1.14645 7.64645C1.24021 7.55268 1.36739 7.50001 1.5 7.50001H13.293L10.146 4.35401C10.0521 4.26012 9.99937 4.13278 9.99937 4.00001C9.99937 3.86723 10.0521 3.73989 10.146 3.64601C10.2399 3.55212 10.3672 3.49937 10.5 3.49937C10.6328 3.49937 10.7601 3.55212 10.854 3.64601L14.854 7.64601C14.9006 7.69245 14.9375 7.74763 14.9627 7.80837C14.9879 7.86912 15.0009 7.93424 15.0009 8.00001C15.0009 8.06577 14.9879 8.13089 14.9627 8.19164C14.9375 8.25238 14.9006 8.30756 14.854 8.35401L10.854 12.354C10.7601 12.4479 10.6328 12.5006 10.5 12.5006C10.3672 12.5006 10.2399 12.4479 10.146 12.354C10.0521 12.2601 9.99937 12.1328 9.99937 12C9.99937 11.8672 10.0521 11.7399 10.146 11.646L13.293 8.50001H1.5C1.36739 8.50001 1.24021 8.44733 1.14645 8.35356C1.05268 8.25979 1 8.13261 1 8.00001V8.00001Z'
                fill='currentColor'
            />
        </svg>
    </Icon>
);

export const FilterIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 24 24' {...props}>
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M9 15.75C9 15.5511 9.07902 15.3603 9.21967 15.2197C9.36032 15.079 9.55109 15 9.75 15H14.25C14.4489 15 14.6397 15.079 14.7803 15.2197C14.921 15.3603 15 15.5511 15 15.75C15 15.9489 14.921 16.1397 14.7803 16.2803C14.6397 16.421 14.4489 16.5 14.25 16.5H9.75C9.55109 16.5 9.36032 16.421 9.21967 16.2803C9.07902 16.1397 9 15.9489 9 15.75ZM6 11.25C6 11.0511 6.07902 10.8603 6.21967 10.7197C6.36032 10.579 6.55109 10.5 6.75 10.5H17.25C17.4489 10.5 17.6397 10.579 17.7803 10.7197C17.921 10.8603 18 11.0511 18 11.25C18 11.4489 17.921 11.6397 17.7803 11.7803C17.6397 11.921 17.4489 12 17.25 12H6.75C6.55109 12 6.36032 11.921 6.21967 11.7803C6.07902 11.6397 6 11.4489 6 11.25ZM3 6.75C3 6.55109 3.07902 6.36032 3.21967 6.21967C3.36032 6.07902 3.55109 6 3.75 6H20.25C20.4489 6 20.6397 6.07902 20.7803 6.21967C20.921 6.36032 21 6.55109 21 6.75C21 6.94891 20.921 7.13968 20.7803 7.28033C20.6397 7.42098 20.4489 7.5 20.25 7.5H3.75C3.55109 7.5 3.36032 7.42098 3.21967 7.28033C3.07902 7.13968 3 6.94891 3 6.75Z'
                fill='black'
            />
        </svg>
    </Icon>
);

export const WriteDownRecipeIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 48 48' {...props}>
        <svg
            width='48'
            height='48'
            viewBox='0 0 48 48'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <rect width='48' height='48' rx='24' fill='black' />
            <path
                d='M35.2531 14.91C35.3932 15.0506 35.4719 15.241 35.4719 15.4395C35.4719 15.638 35.3932 15.8284 35.2531 15.969L33.6886 17.535L30.6886 14.535L32.2531 12.969C32.3937 12.8284 32.5844 12.7494 32.7833 12.7494C32.9822 12.7494 33.1729 12.8284 33.3136 12.969L35.2531 14.9085V14.91ZM32.6281 18.594L29.6281 15.594L19.4086 25.815C19.326 25.8975 19.2639 25.9982 19.2271 26.109L18.0196 29.73C17.9977 29.796 17.9946 29.8668 18.0106 29.9345C18.0266 30.0022 18.0611 30.0641 18.1103 30.1132C18.1595 30.1624 18.2214 30.197 18.2891 30.213C18.3567 30.229 18.4275 30.2259 18.4936 30.204L22.1146 28.9965C22.2252 28.9602 22.3259 28.8985 22.4086 28.8165L32.6281 18.5955V18.594Z'
                fill='#FFFFD3'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M13.5 32.25C13.5 32.8467 13.7371 33.419 14.159 33.841C14.581 34.2629 15.1533 34.5 15.75 34.5H32.25C32.8467 34.5 33.419 34.2629 33.841 33.841C34.2629 33.419 34.5 32.8467 34.5 32.25V23.25C34.5 23.0511 34.421 22.8603 34.2803 22.7197C34.1397 22.579 33.9489 22.5 33.75 22.5C33.5511 22.5 33.3603 22.579 33.2197 22.7197C33.079 22.8603 33 23.0511 33 23.25V32.25C33 32.4489 32.921 32.6397 32.7803 32.7803C32.6397 32.921 32.4489 33 32.25 33H15.75C15.5511 33 15.3603 32.921 15.2197 32.7803C15.079 32.6397 15 32.4489 15 32.25V15.75C15 15.5511 15.079 15.3603 15.2197 15.2197C15.3603 15.079 15.5511 15 15.75 15H25.5C25.6989 15 25.8897 14.921 26.0303 14.7803C26.171 14.6397 26.25 14.4489 26.25 14.25C26.25 14.0511 26.171 13.8603 26.0303 13.7197C25.8897 13.579 25.6989 13.5 25.5 13.5H15.75C15.1533 13.5 14.581 13.7371 14.159 14.159C13.7371 14.581 13.5 15.1533 13.5 15.75V32.25Z'
                fill='#FFFFD3'
            />
        </svg>
    </Icon>
);

export const BurgerMenuIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 24 24' {...props}>
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path d='M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z' fill='black' />
        </svg>
    </Icon>
);

export const HomeIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 40 40' {...props}>
        <svg
            width='40'
            height='40'
            viewBox='0 0 40 40'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <rect width='40' height='40' rx='20' fill='black' />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M14 25.5V19H15V25.5C15 25.6326 15.0527 25.7598 15.1464 25.8536C15.2402 25.9473 15.3674 26 15.5 26H24.5C24.6326 26 24.7598 25.9473 24.8536 25.8536C24.9473 25.7598 25 25.6326 25 25.5V19H26V25.5C26 25.8978 25.842 26.2794 25.5607 26.5607C25.2794 26.842 24.8978 27 24.5 27H15.5C15.1022 27 14.7206 26.842 14.4393 26.5607C14.158 26.2794 14 25.8978 14 25.5ZM25 14.5V18L23 16V14.5C23 14.3674 23.0527 14.2402 23.1464 14.1464C23.2402 14.0527 23.3674 14 23.5 14H24.5C24.6326 14 24.7598 14.0527 24.8536 14.1464C24.9473 14.2402 25 14.3674 25 14.5Z'
                fill='#FFFFD3'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M19.2927 13.5C19.4802 13.3125 19.7345 13.2072 19.9997 13.2072C20.2648 13.2072 20.5191 13.3125 20.7067 13.5L27.3537 20.146C27.4475 20.2399 27.5003 20.3672 27.5003 20.5C27.5003 20.6328 27.4475 20.7601 27.3537 20.854C27.2598 20.9479 27.1324 21.0006 26.9997 21.0006C26.8669 21.0006 26.7395 20.9479 26.6457 20.854L19.9997 14.207L13.3537 20.854C13.2598 20.9479 13.1324 21.0006 12.9997 21.0006C12.8669 21.0006 12.7395 20.9479 12.6457 20.854C12.5518 20.7601 12.499 20.6328 12.499 20.5C12.499 20.3672 12.5518 20.2399 12.6457 20.146L19.2927 13.5Z'
                fill='#FFFFD3'
            />
        </svg>
    </Icon>
);

export const SearchIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 24 24' {...props}>
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M17.6134 15.516C19.0658 13.5341 19.7163 11.0768 19.4348 8.63575C19.1533 6.19474 17.9605 3.95004 16.095 2.35072C14.2295 0.75141 11.829 -0.084566 9.37362 0.0100437C6.91825 0.104653 4.58915 1.12287 2.85227 2.86099C1.1154 4.59911 0.098846 6.92894 0.00599324 9.38438C-0.0868595 11.8398 0.750834 14.2398 2.35148 16.1041C3.95213 17.9684 6.19769 19.1596 8.6389 19.4394C11.0801 19.7192 13.5369 19.0669 15.5179 17.613H15.5164C15.5614 17.673 15.6094 17.73 15.6634 17.7855L21.4384 23.5605C21.7196 23.842 22.1012 24.0002 22.4991 24.0003C22.897 24.0005 23.2787 23.8425 23.5601 23.5613C23.8416 23.28 23.9998 22.8985 23.9999 22.5006C24.0001 22.1027 23.8421 21.721 23.5609 21.4395L17.7859 15.6645C17.7322 15.6102 17.6746 15.5601 17.6134 15.5145V15.516ZM18.0004 9.75003C18.0004 10.8334 17.787 11.9062 17.3724 12.9072C16.9578 13.9081 16.3501 14.8176 15.584 15.5837C14.8179 16.3497 13.9084 16.9574 12.9075 17.372C11.9066 17.7866 10.8338 18 9.75037 18C8.66696 18 7.59417 17.7866 6.59323 17.372C5.5923 16.9574 4.68282 16.3497 3.91674 15.5837C3.15066 14.8176 2.54297 13.9081 2.12836 12.9072C1.71376 11.9062 1.50037 10.8334 1.50037 9.75003C1.50037 7.56199 2.36956 5.46357 3.91674 3.9164C5.46391 2.36922 7.56233 1.50003 9.75037 1.50003C11.9384 1.50003 14.0368 2.36922 15.584 3.9164C17.1312 5.46357 18.0004 7.56199 18.0004 9.75003Z'
                fill='black'
                fillOpacity='0.92'
            />
        </svg>
    </Icon>
);

export const WriteIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 24 24' {...props}>
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M23.2526 2.90998C23.3927 3.05056 23.4714 3.24097 23.4714 3.43948C23.4714 3.63799 23.3927 3.82839 23.2526 3.96898L21.6881 5.53498L18.6881 2.53498L20.2526 0.96898C20.3932 0.828376 20.584 0.74939 20.7828 0.74939C20.9817 0.74939 21.1724 0.828376 21.3131 0.96898L23.2526 2.90848V2.90998ZM20.6276 6.59398L17.6276 3.59398L7.40807 13.815C7.32552 13.8975 7.26337 13.9982 7.22657 14.109L6.01907 17.73C5.99717 17.796 5.99407 17.8668 6.01009 17.9345C6.02612 18.0022 6.06066 18.064 6.10984 18.1132C6.15901 18.1624 6.2209 18.1969 6.28858 18.213C6.35626 18.229 6.42706 18.2259 6.49307 18.204L10.1141 16.9965C10.2247 16.9601 10.3254 16.8985 10.4081 16.8165L20.6276 6.59548V6.59398Z'
                fill='black'
                fillOpacity='0.92'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M1.5 20.25C1.5 20.8467 1.73705 21.419 2.15901 21.841C2.58097 22.2629 3.15326 22.5 3.75 22.5H20.25C20.8467 22.5 21.419 22.2629 21.841 21.841C22.2629 21.419 22.5 20.8467 22.5 20.25V11.25C22.5 11.0511 22.421 10.8603 22.2803 10.7197C22.1397 10.579 21.9489 10.5 21.75 10.5C21.5511 10.5 21.3603 10.579 21.2197 10.7197C21.079 10.8603 21 11.0511 21 11.25V20.25C21 20.4489 20.921 20.6397 20.7803 20.7803C20.6397 20.921 20.4489 21 20.25 21H3.75C3.55109 21 3.36032 20.921 3.21967 20.7803C3.07902 20.6397 3 20.4489 3 20.25V3.75C3 3.55109 3.07902 3.36032 3.21967 3.21967C3.36032 3.07902 3.55109 3 3.75 3H13.5C13.6989 3 13.8897 2.92098 14.0303 2.78033C14.171 2.63968 14.25 2.44891 14.25 2.25C14.25 2.05109 14.171 1.86032 14.0303 1.71967C13.8897 1.57902 13.6989 1.5 13.5 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58097 1.5 3.15326 1.5 3.75V20.25Z'
                fill='black'
                fillOpacity='0.92'
            />
        </svg>
    </Icon>
);

export const TimeIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 16 16' {...props}>
        <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M8.50001 5.5C8.50001 5.36739 8.44733 5.24021 8.35357 5.14645C8.2598 5.05268 8.13262 5 8.00001 5C7.8674 5 7.74023 5.05268 7.64646 5.14645C7.55269 5.24021 7.50001 5.36739 7.50001 5.5V8.862L6.07101 11.242C6.00272 11.3558 5.98242 11.492 6.01458 11.6208C6.04675 11.7495 6.12873 11.8602 6.24251 11.9285C6.35629 11.9968 6.49254 12.0171 6.62128 11.9849C6.75003 11.9528 6.86072 11.8708 6.92901 11.757L8.42901 9.257C8.47551 9.17934 8.50004 9.09051 8.50001 9V5.5Z'
                fill='black'
            />
            <path
                d='M6.5 0C6.36739 0 6.24021 0.0526784 6.14645 0.146447C6.05268 0.240215 6 0.367392 6 0.5C6 0.632608 6.05268 0.759785 6.14645 0.853553C6.24021 0.947322 6.36739 1 6.5 1H7V2.07C5.63827 2.26673 4.3647 2.86034 3.33838 3.77667C2.31205 4.693 1.57848 5.89143 1.22929 7.22224C0.880105 8.55306 0.930786 9.95726 1.37501 11.2594C1.81922 12.5616 2.63729 13.704 3.727 14.544L3.125 15.146C3.03111 15.2398 2.97832 15.367 2.97822 15.4996C2.97813 15.6323 3.03075 15.7596 3.1245 15.8535C3.21825 15.9474 3.34546 16.0002 3.47815 16.0003C3.61083 16.0004 3.73811 15.9478 3.832 15.854L4.578 15.108C5.62302 15.6946 6.80162 16.0018 8 16C9.19838 16.0018 10.377 15.6946 11.422 15.108L12.168 15.854C12.2619 15.9478 12.3892 16.0004 12.5219 16.0003C12.6545 16.0002 12.7817 15.9474 12.8755 15.8535C12.9693 15.7596 13.0219 15.6323 13.0218 15.4996C13.0217 15.367 12.9689 15.2398 12.875 15.146L12.274 14.544C13.3637 13.704 14.1818 12.5615 14.626 11.2592C15.0701 9.95697 15.1207 8.5527 14.7714 7.22186C14.4221 5.89101 13.6884 4.6926 12.662 3.77633C11.6355 2.86007 10.3618 2.26658 9 2.07V1H9.5C9.63261 1 9.75979 0.947322 9.85355 0.853553C9.94732 0.759785 10 0.632608 10 0.5C10 0.367392 9.94732 0.240215 9.85355 0.146447C9.75979 0.0526784 9.63261 0 9.5 0L6.5 0ZM7.538 3.018C7.84556 2.99461 8.15444 2.99461 8.462 3.018C10.0087 3.13745 11.449 3.85129 12.4807 5.00975C13.5124 6.16821 14.0553 7.68124 13.9955 9.23136C13.9358 10.7815 13.278 12.2482 12.1601 13.3238C11.0423 14.3994 9.55127 15.0002 8 15.0002C6.44873 15.0002 4.95774 14.3994 3.83989 13.3238C2.72205 12.2482 2.06422 10.7815 2.00446 9.23136C1.94469 7.68124 2.48762 6.16821 3.51933 5.00975C4.55104 3.85129 5.99133 3.13745 7.538 3.018V3.018ZM2.53287e-09 3.5C2.53287e-09 4.253 0.333 4.929 0.86 5.387C1.63175 3.86695 2.86695 2.63175 4.387 1.86C4.05288 1.47553 3.60929 1.20229 3.11561 1.07687C2.62192 0.951439 2.10171 0.979805 1.62459 1.15817C1.14747 1.33653 0.736221 1.65638 0.445884 2.07489C0.155546 2.49341 -2.29203e-05 2.99063 2.53287e-09 3.5H2.53287e-09ZM13.5 1C12.747 1 12.071 1.333 11.613 1.86C13.1331 2.63175 14.3683 3.86695 15.14 5.387C15.5245 5.05288 15.7977 4.60929 15.9231 4.11561C16.0486 3.62192 16.0202 3.10171 15.8418 2.62459C15.6635 2.14747 15.3436 1.73622 14.9251 1.44588C14.5066 1.15555 14.0094 0.999977 13.5 1V1Z'
                fill='black'
            />
        </svg>
    </Icon>
);

export const SubscribeIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 12 12' {...props}>
        <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M0.75 10.5C0.75 10.5 0 10.5 0 9.75C0 9 0.75 6.75 4.5 6.75C8.25 6.75 9 9 9 9.75C9 10.5 8.25 10.5 8.25 10.5H0.75ZM4.5 6C5.09674 6 5.66903 5.76295 6.09099 5.34099C6.51295 4.91903 6.75 4.34674 6.75 3.75C6.75 3.15326 6.51295 2.58097 6.09099 2.15901C5.66903 1.73705 5.09674 1.5 4.5 1.5C3.90326 1.5 3.33097 1.73705 2.90901 2.15901C2.48705 2.58097 2.25 3.15326 2.25 3.75C2.25 4.34674 2.48705 4.91903 2.90901 5.34099C3.33097 5.76295 3.90326 6 4.5 6V6Z'
                fill='white'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M10.125 3.75C10.2245 3.75 10.3198 3.78951 10.3902 3.85984C10.4605 3.93016 10.5 4.02554 10.5 4.125V5.25H11.625C11.7245 5.25 11.8198 5.28951 11.8902 5.35984C11.9605 5.43016 12 5.52554 12 5.625C12 5.72446 11.9605 5.81984 11.8902 5.89016C11.8198 5.96049 11.7245 6 11.625 6H10.5V7.125C10.5 7.22446 10.4605 7.31984 10.3902 7.39017C10.3198 7.46049 10.2245 7.5 10.125 7.5C10.0255 7.5 9.93016 7.46049 9.85983 7.39017C9.78951 7.31984 9.75 7.22446 9.75 7.125V6H8.625C8.52554 6 8.43016 5.96049 8.35983 5.89016C8.28951 5.81984 8.25 5.72446 8.25 5.625C8.25 5.52554 8.28951 5.43016 8.35983 5.35984C8.43016 5.28951 8.52554 5.25 8.625 5.25H9.75V4.125C9.75 4.02554 9.78951 3.93016 9.85983 3.85984C9.93016 3.78951 10.0255 3.75 10.125 3.75Z'
                fill='white'
            />
        </svg>
    </Icon>
);

export const SubscribersIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 12 12' {...props}>
        <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M11.25 10.5C11.25 10.5 12 10.5 12 9.75C12 9 11.25 6.75 8.25 6.75C5.25 6.75 4.5 9 4.5 9.75C4.5 10.5 5.25 10.5 5.25 10.5H11.25ZM5.2665 9.75C5.26096 9.74924 5.25545 9.74824 5.25 9.747C5.25075 9.549 5.37525 8.9745 5.82 8.457C6.234 7.97175 6.9615 7.5 8.25 7.5C9.53775 7.5 10.2652 7.9725 10.68 8.457C11.1247 8.9745 11.2485 9.54975 11.25 9.747L11.244 9.7485C11.2405 9.74909 11.237 9.74959 11.2335 9.75H5.2665V9.75ZM8.25 5.25C8.64782 5.25 9.02936 5.09196 9.31066 4.81066C9.59196 4.52936 9.75 4.14782 9.75 3.75C9.75 3.35218 9.59196 2.97064 9.31066 2.68934C9.02936 2.40804 8.64782 2.25 8.25 2.25C7.85218 2.25 7.47064 2.40804 7.18934 2.68934C6.90804 2.97064 6.75 3.35218 6.75 3.75C6.75 4.14782 6.90804 4.52936 7.18934 4.81066C7.47064 5.09196 7.85218 5.25 8.25 5.25ZM10.5 3.75C10.5 4.04547 10.4418 4.33806 10.3287 4.61104C10.2157 4.88402 10.0499 5.13206 9.84099 5.34099C9.63206 5.54992 9.38402 5.71566 9.11104 5.82873C8.83806 5.9418 8.54547 6 8.25 6C7.95453 6 7.66194 5.9418 7.38896 5.82873C7.11598 5.71566 6.86794 5.54992 6.65901 5.34099C6.45008 5.13206 6.28434 4.88402 6.17127 4.61104C6.0582 4.33806 6 4.04547 6 3.75C6 3.15326 6.23705 2.58097 6.65901 2.15901C7.08097 1.73705 7.65326 1.5 8.25 1.5C8.84674 1.5 9.41903 1.73705 9.84099 2.15901C10.2629 2.58097 10.5 3.15326 10.5 3.75V3.75ZM5.202 6.96C4.90199 6.86553 4.59273 6.80343 4.2795 6.77475C4.1035 6.75801 3.92679 6.74975 3.75 6.75C0.75 6.75 0 9 0 9.75C0 10.2502 0.24975 10.5 0.75 10.5H3.912C3.80082 10.2659 3.74537 10.0092 3.75 9.75C3.75 8.9925 4.03275 8.2185 4.5675 7.572C4.74975 7.3515 4.962 7.14525 5.202 6.96ZM3.69 7.5C3.24612 8.16695 3.00633 8.94886 3 9.75H0.75C0.75 9.555 0.873 8.9775 1.32 8.457C1.72875 7.98 2.439 7.515 3.69 7.50075V7.5ZM1.125 4.125C1.125 3.52826 1.36205 2.95597 1.78401 2.53401C2.20597 2.11205 2.77826 1.875 3.375 1.875C3.97174 1.875 4.54403 2.11205 4.96599 2.53401C5.38795 2.95597 5.625 3.52826 5.625 4.125C5.625 4.72174 5.38795 5.29403 4.96599 5.71599C4.54403 6.13795 3.97174 6.375 3.375 6.375C2.77826 6.375 2.20597 6.13795 1.78401 5.71599C1.36205 5.29403 1.125 4.72174 1.125 4.125V4.125ZM3.375 2.625C2.97718 2.625 2.59564 2.78304 2.31434 3.06434C2.03304 3.34564 1.875 3.72718 1.875 4.125C1.875 4.52282 2.03304 4.90436 2.31434 5.18566C2.59564 5.46696 2.97718 5.625 3.375 5.625C3.77282 5.625 4.15436 5.46696 4.43566 5.18566C4.71696 4.90436 4.875 4.52282 4.875 4.125C4.875 3.72718 4.71696 3.34564 4.43566 3.06434C4.15436 2.78304 3.77282 2.625 3.375 2.625Z'
                fill='black'
            />
        </svg>
    </Icon>
);
