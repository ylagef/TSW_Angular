<?=$this->
    Html->css('pollAdd')?>
<!-- CENTRAL JUMBOTRON -->
<div class="jumbotron jumbotron-fluid rounded">
    <div class="container">
        <h1 class="display-4">
            <?=__("Create your poll")?>
        </h1>
        <p class="lead">
            <?=__("First, we need some things...")?>
        </p>
        <?=$this->Form->create($poll)?>
        <div class="input-group mb-3">
            <div class="form-group row">
                <div class="col-xs-12 col-sm-12 col-md-6">
                    <label>
                        <?=__("Why?")?>
                    </label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <i class="material-icons">
                                    keyboard_arrow_right
                                </i>
                            </div>
                        </div>
                        <?=$this->Form->control('title', ["class" => "form-control", "placeholder" => __("Reason"), "label" => false])?>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6">
                    <label>
                        <?=__("Where?")?>
                    </label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <i class="material-icons">
                                    place
                                </i>
                            </div>
                        </div>
                        <?=$this->Form->control('location', ["class" => "form-control", "placeholder" => __("Location"), "label" => false])?>
                    </div>
                </div>
            </div>
        </div>
        <small class="form-text text-muted" id="help">
            - <?=__("Reason is mandatory")?> -
        </small>
        <div class="form-group row submit-button">
            <div class="col-sm-10">
                <?=$this->Form->button(__('Continue'), ["class" => "btn btn-outline-secondary"]);?>
            </div>
        </div>
        
<?= $this->Form->hidden('author', ["value"=>($this->request->getSession()->read('Auth.User.user_id'))]);
$this->Form->end();?>
    </div>
</div>