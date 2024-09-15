<template>
    <div>
        <div class="h-100 bg-premium-dark">
            <div class="d-flex h-100 justify-content-center align-items-center">
                <div class="col-md-8 mx-auto app-login-box">
                    <div class="app-logo-inverse mx-auto mb-3"></div>
                    <div class="modal-dialog w-100">
                        <div class="modal-content">
                            <div class="modal-body">
                                <h5 class="modal-title">
                                    <h4 class="mt-2">
                                        <div>Welcome,</div>
                                        <span>It only takes a <span class="text-success">few seconds</span> to create
                                            your account</span>
                                    </h4>
                                </h5>
                                <div class="divider"></div>
                                <form>
                                    <div class="form-group" id="exampleInputGroup1">
                                        <label for="exampleInput1">Email</label>
                                        <input type="email" class="form-control" id="exampleInput1" required
                                            placeholder="Enter email...">
                                        <small id="exampleInput1Help" class="form-text text-muted">We'll never share
                                            your
                                            email with anyone else.</small>
                                    </div>

                                    <div class="form-group" id="exampleInputGroup2">
                                        <label for="exampleInput12">Username</label>
                                        <input type="text" class="form-control" id="exampleInput2" required
                                            placeholder="Enter username...">
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="exampleInput3">Password</label>
                                                <input type="password" class="form-control" id="exampleInput3" required
                                                    placeholder="Enter password...">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="exampleInput4">Repeat Password</label>
                                                <input type="password" class="form-control" id="exampleInput4" required
                                                    placeholder="Repeat Password">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="exampleCheck" name="check">
                                        <label class="form-check-label" for="exampleCheck">
                                            Accept our <a href="javascript:void(0);">Terms and Conditions</a>.
                                        </label>
                                    </div>

                                    <div class="divider"></div>
                                    <h6 class="mb-0">
                                        Already have an account?
                                        <a href="javascript:void(0);" class="text-primary">Sign in</a>|<a
                                            href="javascript:void(0);" class="text-primary">Recover Password</a>
                                    </h6>
                                </form>
                            </div>
                            <div class="modal-footer d-block text-center">
                                <button
                                    class="btn btn-primary btn-lg btn-wide btn-pill btn-shadow btn-hover-shine">Create
                                    Account</button>
                            </div>
                        </div>
                    </div>
                    <div class="text-center text-white opacity-8 mt-3">
                        Copyright &copy; JoshuaTrinh 2019
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
