(function ($) {

    var csasVapPbar = $('<div class="csas-vap-autoload-wr"><div class="csas-vap-loading-bar"></div></div>');
    var csasVapCnt = '.view-content';

    function csasVapApInint(csasAs, csasApCs, csasApC) {
        if (!$('body').hasClass('csas-vap-progress')) {
            var scrInBottom = (csasApC.offset().top + csasApC.outerHeight()) < ($(window).height() + $(window).scrollTop());
            var thisPage = parseInt(csasAs.attr('data-csas-vap-up-page'), 10);
            var lastPage = parseInt(csasAs.attr('data-csas-vap-up-lpage'), 10);
            if (scrInBottom && thisPage < lastPage) {
                if (!$('.csas-vap-autoload-wr', csasApC.parent()).length) {
                    csasApC.after(csasVapPbar.clone());
                }
                $('body').addClass('csas-vap-progress');
                var thisUri = csasAs.attr('data-csas-vap-ruri');
                var nextPage = parseInt(thisPage, 10) + 1;

                //show process
                $('.csas-vap-loading-bar').show();
                var newItemsWr = $('<div>');
                var existGet = /\?/.test(thisUri);
                if (existGet) {
                    var getPage = '&page=' + nextPage;
                } else {
                    var getPage = '?page=' + nextPage;
                }
                newItemsWr.load(thisUri + getPage + ' ' + csasApCs + ' > *', function () {

                    $('.csas-vap-loading-bar').hide();
                    if ($(' > *', newItemsWr).length) {
                        var nI = newItemsWr.html();
                        csasApC.append(nI); //wo isotope
                        csasAs.attr('data-csas-vap-up-page', nextPage);
                        $('body').removeClass('csas-vap-progress');
                        csasApC.trigger('csasVapAppendItems', nI);
                    }
                });
            }
        }
    };


    function csasVapApAth(prn) {
        if (typeof prn == 'undefined') {
            prn = $(document);
        }
        $('.csas-vap').once('csas-vap', function () {
            var csasAsE = $(this);
            var csasApCsE = '.' + csasAsE.attr('data-csas-vap-cls') + ' ' + csasVapCnt;
            var csasApCe = $(csasVapCnt, csasAsE);
            $(window).bind('scroll', function () {
                csasVapApInint(csasAsE, csasApCsE, csasApCe);
            });
            csasVapApInint(csasAsE, csasApCsE, csasApCe);
        });
    };

    Drupal.behaviors.csasVap = {};
    Drupal.behaviors.csasVap.attach = function (context, settings) {
        csasVapApAth(context);
        $(document).on('documentChange', function () {
            csasVapApAth();
        });
    };

    $(window).on('load', function () {
        csasVapApAth();
    });

})(jQuery);