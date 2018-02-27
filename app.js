var express                 = require("express"),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    flash                   = require("connect-flash"),
    async                   = require("async"),
    nodemailer              = require("nodemailer"),
    crypto                  = require("crypto"),
    methodOverride          = require("method-override"),
    Patient                 = require("./models/patients"),
    User                    = require("./models/user"),
    passport                = require("passport"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    localStratergy          = require("passport-local"),
    app                     = express();

//Application configuration
mongoose.connect("mongodb://localhost/pharmacist");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//session and passport configuration
app.use(flash());
app.use(require("express-session")({
    secret: "Pharmacy app for mausi ji!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");

    next();
});




//Landing route
app.get("/", function(req, res){
    res.render("landing");
});

//show page
app.get("/records", isLoggedIn, function(req, res){
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Patient.find({"pharmacist.id" : req.user._id, name : regex}, function(err, foundRecords){
        if(err){
            req.flash("error","There is some problem parsing your request, Please try again later.");
            res.redirect("/records");
        }else{
            var MaleChildNew=0, MaleNew=0, femaleChildNew=0, femaleNew=0, policeMaleChildNew = 0, policefemaleChildNew=0, policeMaleNew=0, policefemaleNew=0, npoliceMaleChildNew=0, npoliceMaleNew=0, npolicefemaleChildNew=0, npolicefemaleNew=0, MaleChildOld=0, MaleOld=0, femaleChildOld=0, femaleOld=0, policeMaleChildOld = 0, policefemaleChildOld=0, policeMaleOld=0, policefemaleOld=0, npoliceMaleChildOld=0, npoliceMaleOld=0, npolicefemaleChildOld=0, npolicefemaleOld=0;
            var reversedRecords = foundRecords.reverse();
            
            for(var i= 0; i < foundRecords.length ; i++){
                if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'new' ){
                    policeMaleChildNew++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'new' ){
                    policefemaleChildNew++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'new' ){
                    policeMaleNew++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'new' ){
                    policefemaleNew++;
                } if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'new' ){
                    npoliceMaleChildNew++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'new' ){
                    npolicefemaleChildNew++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'new' ){
                    npoliceMaleNew++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'new' ){
                    npolicefemaleNew++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'new' ){
                    MaleChildNew++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'new' ){
                    femaleChildNew++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'new' ){
                    MaleNew++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'new' ){
                    femaleNew++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'old' ){
                    policeMaleChildOld++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'old' ){
                    policefemaleChildOld++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'old' ){
                    policeMaleOld++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'old' ){
                    policefemaleOld++;
                } if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'old' ){
                    npoliceMaleChildOld++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'old' ){
                    npolicefemaleChildOld++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'old' ){
                    npoliceMaleOld++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'old' ){
                    npolicefemaleOld++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'old' ){
                    MaleChildOld++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'old' ){
                    femaleChildOld++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'old' ){
                    MaleOld++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'old' ){
                    femaleOld++;
                }
            }
            res.render("pharmacist/records", {records: reversedRecords, pmcn: policeMaleChildNew, pfcn : policefemaleChildNew, pmn : policeMaleNew, pfn : policefemaleNew, npmcn: npoliceMaleChildNew, npfcn : npolicefemaleChildNew, npmn : npoliceMaleNew, npfn : npolicefemaleNew, mcn: MaleChildNew, fcn : femaleChildNew, mn : MaleNew, fn : femaleNew, pmco: policeMaleChildOld, pfco : policefemaleChildOld, pmo : policeMaleOld, pfo : policefemaleOld, npmco: npoliceMaleChildOld, npfco : npolicefemaleChildOld, npmo : npoliceMaleOld, npfo : npolicefemaleOld, mco: MaleChildOld, fco : femaleChildOld, mo : MaleOld, fo : femaleOld});
        }
    });
    }else if(req.query.searchDate){
        
        var d = new Date(req.query.searchDate);
        var e = new Date(req.query.searchDateend);
    Patient.find({"pharmacist.id": req.user._id, created : { "$gte":  d, "$lt": e}}, function(err, foundRecords){
        if(err){
            req.flash("error","There is some problem parsing your request, Please try again later.");
            res.redirect("/records");
        }else{
            var MaleChildNew=0, MaleNew=0, femaleChildNew=0, femaleNew=0, policeMaleChildNew = 0, policefemaleChildNew=0, policeMaleNew=0, policefemaleNew=0, npoliceMaleChildNew=0, npoliceMaleNew=0, npolicefemaleChildNew=0, npolicefemaleNew=0, MaleChildOld=0, MaleOld=0, femaleChildOld=0, femaleOld=0, policeMaleChildOld = 0, policefemaleChildOld=0, policeMaleOld=0, policefemaleOld=0, npoliceMaleChildOld=0, npoliceMaleOld=0, npolicefemaleChildOld=0, npolicefemaleOld=0;
            var reversedRecords = foundRecords.reverse();
            
            for(var i= 0; i < foundRecords.length ; i++){
                if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'new' ){
                    policeMaleChildNew++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'new' ){
                    policefemaleChildNew++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'new' ){
                    policeMaleNew++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'new' ){
                    policefemaleNew++;
                } if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'new' ){
                    npoliceMaleChildNew++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'new' ){
                    npolicefemaleChildNew++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'new' ){
                    npoliceMaleNew++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'new' ){
                    npolicefemaleNew++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'new' ){
                    MaleChildNew++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'new' ){
                    femaleChildNew++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'new' ){
                    MaleNew++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'new' ){
                    femaleNew++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'old' ){
                    policeMaleChildOld++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'old' ){
                    policefemaleChildOld++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'old' ){
                    policeMaleOld++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'old' ){
                    policefemaleOld++;
                } if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'old' ){
                    npoliceMaleChildOld++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'old' ){
                    npolicefemaleChildOld++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'old' ){
                    npoliceMaleOld++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'old' ){
                    npolicefemaleOld++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'old' ){
                    MaleChildOld++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'old' ){
                    femaleChildOld++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'old' ){
                    MaleOld++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'old' ){
                    femaleOld++;
                }
            }
            res.render("pharmacist/records", {records: reversedRecords, pmcn: policeMaleChildNew, pfcn : policefemaleChildNew, pmn : policeMaleNew, pfn : policefemaleNew, npmcn: npoliceMaleChildNew, npfcn : npolicefemaleChildNew, npmn : npoliceMaleNew, npfn : npolicefemaleNew, mcn: MaleChildNew, fcn : femaleChildNew, mn : MaleNew, fn : femaleNew, pmco: policeMaleChildOld, pfco : policefemaleChildOld, pmo : policeMaleOld, pfo : policefemaleOld, npmco: npoliceMaleChildOld, npfco : npolicefemaleChildOld, npmo : npoliceMaleOld, npfo : npolicefemaleOld, mco: MaleChildOld, fco : femaleChildOld, mo : MaleOld, fo : femaleOld});
        }
    });
    }else {
    Patient.find({"pharmacist.id": req.user._id}, function(err, foundRecords){
        if(err){
            req.flash("error","There is some problem parsing your request, Please try again later.");
            res.redirect("/records");
        }else{
            var MaleChildNew=0, MaleNew=0, femaleChildNew=0, femaleNew=0, policeMaleChildNew = 0, policefemaleChildNew=0, policeMaleNew=0, policefemaleNew=0, npoliceMaleChildNew=0, npoliceMaleNew=0, npolicefemaleChildNew=0, npolicefemaleNew=0, MaleChildOld=0, MaleOld=0, femaleChildOld=0, femaleOld=0, policeMaleChildOld = 0, policefemaleChildOld=0, policeMaleOld=0, policefemaleOld=0, npoliceMaleChildOld=0, npoliceMaleOld=0, npolicefemaleChildOld=0, npolicefemaleOld=0;
            var reversedRecords = foundRecords.reverse();
            
            for(var i= 0; i < foundRecords.length ; i++){
                if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'new' ){
                    policeMaleChildNew++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'new' ){
                    policefemaleChildNew++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'new' ){
                    policeMaleNew++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'new' ){
                    policefemaleNew++;
                } if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'new' ){
                    npoliceMaleChildNew++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'new' ){
                    npolicefemaleChildNew++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'new' ){
                    npoliceMaleNew++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'new' ){
                    npolicefemaleNew++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'new' ){
                    MaleChildNew++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'new' ){
                    femaleChildNew++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'new' ){
                    MaleNew++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'new' ){
                    femaleNew++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'old' ){
                    policeMaleChildOld++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'old' ){
                    policefemaleChildOld++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'old' ){
                    policeMaleOld++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'policePerson' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'old' ){
                    policefemaleOld++;
                } if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'old' ){
                    npoliceMaleChildOld++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'old' ){
                    npolicefemaleChildOld++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'old' ){
                    npoliceMaleOld++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'nonPolice' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'old' ){
                    npolicefemaleOld++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'old' ){
                    MaleChildOld++;
                }else if(foundRecords[i]['age'] <= 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'old' ){
                    femaleChildOld++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'male' && foundRecords[i]['opdType'] == 'old' ){
                    MaleOld++;
                }else if(foundRecords[i]['age'] > 12 && foundRecords[i]['patientType'] == 'govtOfficials' && foundRecords[i]['sex'] == 'female' && foundRecords[i]['opdType'] == 'old' ){
                    femaleOld++;
                }
            }
            res.render("pharmacist/records", {records: reversedRecords, pmcn: policeMaleChildNew, pfcn : policefemaleChildNew, pmn : policeMaleNew, pfn : policefemaleNew, npmcn: npoliceMaleChildNew, npfcn : npolicefemaleChildNew, npmn : npoliceMaleNew, npfn : npolicefemaleNew, mcn: MaleChildNew, fcn : femaleChildNew, mn : MaleNew, fn : femaleNew, pmco: policeMaleChildOld, pfco : policefemaleChildOld, pmo : policeMaleOld, pfo : policefemaleOld, npmco: npoliceMaleChildOld, npfco : npolicefemaleChildOld, npmo : npoliceMaleOld, npfo : npolicefemaleOld, mco: MaleChildOld, fco : femaleChildOld, mo : MaleOld, fo : femaleOld});
        }
    });
    }
});

//create route
app.get("/records/newPatient", isLoggedIn, function(req, res){
    res.render("patient/new");
});

app.post("/records", isLoggedIn, function(req, res){
    User.find(req.user, function(err, user){
        if(err){
            req.flash("error","There is some error parsing your details, Please try again later.");
            console.log(err);
            res.redirect("/");
        } else{
            Patient.create(req.body.record, function(err, record){
               if(err){
                   req.flash("error","Could not process the request, Please try again later.");
                   console.log(err);
               } else{
                   //add username and id to comment
                   record.pharmacist.id = req.user._id;
                   
                   //save comment
                   record.save((err, newRecord) => {
                        if(err) {
                         req.flash("error", err.message);
                         res.redirect('back');
                         return;
                         } else{
                                //already exists
                                var array= [];
                                Patient.find({"pharmacist.id": req.user._id}, function(err, allRecords){
                                    if(err){
                                        req.flash("error", "There is some error contacting the Data, Please try in some time.");
                                    }else{
                                    allRecords.forEach(function(allRecord){
                                        if(allRecord.name == newRecord.name && allRecord.age == newRecord.age && allRecord.sex == newRecord.sex && allRecord.opdType == newRecord.opdType && allRecord.patientType == newRecord.patientType){
                                            array.unshift(allRecord.created);
                                        }
                                    });
                                    
                                    if(array[0] && array[1] && array[0].toDateString == array[1].toDateString){
                                        req.flash("error","This patient has visited again today");
                                        res.redirect('/records/'+ newRecord._id);
                                    }else{
                                    
                                    req.flash("success","Added a new record to the database.");
                                    res.redirect('/records/'+ newRecord._id);
                                    }
                                }
                                });
                                    //same date error
                                    //else next
                                //else load next page
                            
                         }
                   });
                   
               } 
            });
        }
    });
});
//detailed show page read
app.get("/records/:id",isLoggedIn, function(req, res){
    Patient.find({"pharmacist.id": req.user._id}, function(err, allRecords){
        if(err){
            req.flash("error", "There is some error parsing the request.");
        }else{   
            Patient.findById(req.params.id, function(err, foundRecord){
        if(err){
            //error not authenticated for this
            req.flash("error","Could not process the request, Sorry.");
            console.log(err);
            res.redirect("/records");
        } else {
            var arr=[];
            // var j=0;
            
            if(foundRecord.pharmacist.id.equals(req.user._id)){
                for(var i=0; i < allRecords.length ; i++){
                if(allRecords[i].name == foundRecord.name){
                    arr.unshift(allRecords[i].created);
                }
                
            }
                res.render("patient/show", {record: foundRecord, arr: arr});
            } else{
                req.flash("error","You are not authenticated to view this record.");
                res.redirect("/records");
            }
            
        }
    });
    // 
        }
    });
    
    
    
    
});

//edit routes
app.get("/records/:id/edit",isLoggedIn, function(req, res){
    Patient.findById(req.params.id, function(err, foundRecord){
        if(err){
            //error not authenticated for this
            console.log(err);
            res.redirect("/records");
        } else {
            if(foundRecord.pharmacist.id.equals(req.user._id)){
                res.render("patient/edit", {record: foundRecord});
            } else{
                res.redirect("/records");
            }
            
        }
    });
    
});
//update routes
app.put("/records/:id", isLoggedIn, function(req, res){
   
    Patient.findByIdAndUpdate(req.params.id, req.body.record, function(err, updatedBlog){
        if(err){
            req.flash("error","Could not process the request, Please try again later.");
            res.redirect("/records");
        }else{
            req.flash("success","Successfully updated the record.");
            res.redirect("/records/" + req.params.id);
        }
    });
});
//delete route
app.delete("/records/:id",isLoggedIn, function(req, res){
    //destroy blog
    Patient.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error","Could not process the request, Sorry.");
            res.redirect("/records");
        }else{
            req.flash("success","Successfully deleted the record.");
            res.redirect("/records");
        }
    });
});


//authentication rout
app.get("/register",isLogged, function(req, res){
    res.render("register");
});

app.post("/register", isLogged ,function(req, res){
    var newUser = new User(
        {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            avatar: req.body.avatar,
            email: req.body.email
        
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", "There is some error Registering the user, Try using different username and email.(You can only make one account with a specific email.)");
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Welcome to the pharmacist's diary " +  user.username+ "!" );
            res.redirect("/records");
        });
    });
});

app.get("/login", isLogged , function(req, res){
    res.render("login");
});

app.post("/login", isLogged , passport.authenticate("local", 
{
    successRedirect : "/records",
    failureRedirect : "/login"
}), function(req, res){
    
});

app.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You have successfully logged out.");
    res.redirect("/");
});

//password recovery
app.get("/forgot" , function(req, res){
    res.render("forgot");
});

app.post("/forgot", function(req, res, next){
    async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'tomayanknauriyal@gmail.com',
          pass: process.env.GMAILPW
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'PharmaApp',
        subject: 'Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

app.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }else{
    res.render('reset', {token: req.params.token});
    }
  });
});

app.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (err) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('/');
        }else{
        if(req.body.password === req.body.confirm) {
          user.setPassword(req.body.password, function(err) {
              if(!user){
                  req.flash("error", "There was some error while handling this request. Please try again later");
              }else{
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
              }
          });
        } else {
            req.flash("error", "Passwords do not match.");
            return res.redirect('back');
        }
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'tomayanknauriyal@gmail.com',
          pass: process.env.GMAILPW
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'PharmaApp',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
});

app.get("/aboutCreator", function(req, res){
    res.render("about");
});


//any foul route
app.get("*", function(req, res){
    res.redirect("/");
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else {
        req.flash("error", "you need to login first");
         res.redirect("/login");
    }
}

function isLogged(req, res, next){
    if(req.isAuthenticated()){
        req.flash("error", "You are already logged in!");
        res.redirect("/records");
    }else {
         return next();
    }
}


function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

//port
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Server HAS STARTED!");
});