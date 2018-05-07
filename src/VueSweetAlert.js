import swal from 'sweetalert2';

require( 'sweetalert2/dist/sweetalert2.css' );

const VueSwal = {};

VueSwal.install = function ( Vue, vueSwalOptions )
{
    Vue.prototype.allSweetAlerts = vueSwalOptions.sweetAlerts;
    Vue.prototype.sweetAlertTrackFn = typeof vueSwalOptions.track !== "undefined" ? vueSwalOptions.track : swal.noop;

    Vue.prototype.$swopt = ( name, options ) =>
    {
        if ( typeof Vue.prototype.allSweetAlerts[ name ] !== 'undefined' )
        {
            if ( typeof options === 'undefined' )
            {
                options = {};
            }
            Vue.prototype.sweetAlertTrackFn( name );
            return Object.assign( Vue.prototype.allSweetAlerts.defaults, Vue.prototype.allSweetAlerts[ name ], options );
        }
    };

    Vue.prototype.$swal = ( options, thenFn, catchFn ) =>
    {
        if ( typeof options === 'string' )
        {
            options = Vue.prototype.$swopt( options );
        }

        if ( typeof thenFn === 'undefined' )
        {
            if ( typeof options.then !== 'undefined' )
            {
                thenFn = options.then;
                delete options.then;
            }
            else
            {
                thenFn = swal.noop;
            }
        }

        if ( typeof catchFn === 'undefined' )
        {
            if ( typeof options.catch !== 'undefined' )
            {
                catchFn = options.catch;
                delete options.catch;
            }
            else
            {
                catchFn = swal.noop;
            }
        }

        return swal( options ).then( ( result ) => result.dismiss ? catchFn() : thenFn() ).catch( catchFn );
    };
};

export default VueSwal;